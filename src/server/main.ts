import express from "express";
import ViteExpress from "vite-express";
import {Prisma, PrismaClient} from "@prisma/client";
import session from 'express-session'
import _ from 'lodash'
import {StatusCode} from 'status-code-enum'
import bcrypt from 'bcrypt'
import {Server as SocketIO} from 'socket.io'
import {SocketClientMessages, SocketServerMessages} from "./types/socket";
import fs from 'fs'
import path from 'path'
import {v1 as uuid} from 'uuid'

const app = express();
const prisma = new PrismaClient()

const saltRounds = 10
type IsCorrectPassword = boolean
export enum CompareResult {
    correct,
    incorrect,
    nouser
}
const encryption = {
    hashAndStore: async (userid: number, pass: string) => {
        let hash = await bcrypt.hash(pass, saltRounds)
        await prisma.user.update({
            where: {id: userid},
            data: {
                password: hash
            }
        })
    },
    compare: async (userid: number, pass: string): Promise<CompareResult> => {
        let stored = await prisma.user.findFirst({
            where: {id: userid},
            select: {password: true},
        })
        if (_.isNull(stored)) return CompareResult.nouser
        let comparison = await bcrypt.compare(pass, stored.password)
        return comparison ? CompareResult.correct : CompareResult.incorrect
    }
}
const secret = 'pUV0YwQAbT+svQ/F+d2ZilnClPL2NNVS/vMU7HXfeHk='
app.set('trust proxy', 1)
app.use(express.json())
app.use(session({
    secret,
    resave: false,
    saveUninitialized: true,
}))

app.post('/login', (req, res) => {
    try {
        let {username, password} = req.body as {username: string, password: string}
        console.log(req.body)
        console.log(username)
        console.log(password)
        prisma.user.findFirst({where: {username}}).then(user => {
            try {
                if (_.isNull(user)) res.status(StatusCode.ClientErrorUnauthorized).send()
                else {
                    let cmp = bcrypt.compareSync(password, user.password)
                    if (!cmp) res.status(StatusCode.ClientErrorUnauthorized).send()
                    else res.send(_.omit(user, 'password'))
                }
            } catch (e) { res.status(StatusCode.ServerErrorInternal).send() }
        })
    } catch (e) { res.status(StatusCode.ServerErrorInternal).send() }
})

const apiRouter = express.Router()

apiRouter.use(express.json())

apiRouter.get('/users', (req, res) => {
    try {
        const body = req.body as Prisma.UserFindManyArgs
        prisma.user.findMany(body).then(users => {
            res.send(users.map(u => _.omit(u, 'password')))
        })
    } catch (e) {
        res.status(StatusCode.ServerErrorInternal).send()
    }
})

apiRouter.post('/users', (req, res) => {
    try {
        const body = req.body as Prisma.UserCreateArgs
        prisma.user.create(body).then(user => {

        })
    } catch (e) {
        res.status(StatusCode.ServerErrorInternal).send()
    }
})


const server = ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);


const io = new SocketIO(server)

io.on('connection', async (socket) => {
    const getUsers = () => prisma.user.findMany()
    const getWarehouses = () => prisma.warehouse.findMany()
    const getItems = () => prisma.inventoryItem.findMany()
    const getIdata = () => prisma.inventoryItemData.findMany()
    const getEvents = () => prisma.events.findMany().then(v => v.map(e => ({...e, time: e.time.toDateString()})))
    const sendDataAndEvents = async (msg: SocketClientMessages, cb: () => Promise<any>) => {
        io.emit(msg, await cb())
        io.emit(SocketClientMessages.ReceiveEvents, await getEvents())
    }
    // Hydration Layer
    socket.emit(SocketClientMessages.ReceiveItemData, await getIdata())
    socket.emit(SocketClientMessages.ReceiveItems, await getItems())
    socket.emit(SocketClientMessages.ReceiveWarehouses, await getWarehouses())
    socket.emit(SocketClientMessages.ReceiveUsers, await getUsers())
    socket.emit(SocketClientMessages.ReceiveEvents, await getEvents())
    // Socket events
    socket.on(SocketServerMessages.ItemCreated, async (item: Prisma.InventoryItemCreateArgs) => {
        await prisma.inventoryItem.create(item)
        sendDataAndEvents(SocketClientMessages.ReceiveItems, getItems)
    })
    socket.on(SocketServerMessages.ItemsChanged, async (v: Prisma.InventoryItemUpdateArgs) => {
        await prisma.inventoryItem.update(v)
        sendDataAndEvents(SocketClientMessages.ReceiveItems, getItems)
    })
    socket.on(SocketServerMessages.ItemDeleted, async (v: Prisma.InventoryItemDeleteArgs) => {
        await prisma.inventoryItem.delete(v)
        sendDataAndEvents(SocketClientMessages.ReceiveItems, getItems)
    })
    socket.on(SocketServerMessages.ItemDataChanged, async (v: Prisma.InventoryItemDataUpdateArgs) => {
        await prisma.inventoryItemData.update(v)
        sendDataAndEvents(SocketClientMessages.ReceiveItemData, getIdata)
    })
    socket.on(SocketServerMessages.ItemDataCreated, async (v: Prisma.InventoryItemDataCreateArgs) => {
        await prisma.inventoryItemData.create(v)
        sendDataAndEvents(SocketClientMessages.ReceiveItemData, getIdata)
    })
    socket.on(SocketServerMessages.UserCreated, async (v: Prisma.UserCreateArgs) => {
        let user = await prisma.user.create(v)
        if (_.has(v, 'data.password')) {
            await encryption.hashAndStore(user.id, v.data!.password as string)
        }
        sendDataAndEvents(SocketClientMessages.ReceiveUsers, getIdata)
    })
    socket.on(SocketServerMessages.UserChanged, async (v: Prisma.UserUpdateArgs) => {
        if (_.has(v, 'data.password')) {
            await encryption.hashAndStore(v.where!.id!, v.data!.password as string)
        }
        await prisma.user.update(v)
        sendDataAndEvents(SocketClientMessages.ReceiveUsers, getIdata)
    })
    socket.on(SocketServerMessages.UploadItemImage, async (image) => {
        const splitted = image.split(';base64,')
        const format = splitted[0].split('/')[1]
        const filename = `${uuid()}.${format}`
        fs.writeFileSync(path.resolve(__dirname, '../../', 'public', 'item-images', filename), splitted[1], {encoding: 'base64'})
        socket.emit(SocketClientMessages.ReceiveItemImageURL, filename)
    })

    socket.on(SocketServerMessages.UploadProfileImage, async (image) => {
        const splitted = image.split(';base64,')
        const format = splitted[0].split('/')[1]
        const filename = `${uuid()}.${format}`
        fs.writeFileSync(path.resolve(__dirname, '../../', 'public', 'profile-images', filename), splitted[1], {encoding: 'base64'})
        socket.emit(SocketClientMessages.ReceiveProfileImageURL, filename)
    })


})