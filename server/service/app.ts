import path from 'path'
import Fastify, { FastifyServerFactory } from 'fastify'
import helmet, {FastifyHelmetOptions} from '@fastify/helmet'
import cors, {FastifyCorsOptions} from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie, {FastifyCookieOptions} from '@fastify/cookie'
import {
    API_JWT_SECRET,
    API_BASE_PATH,
    API_UPLOAD_DIR
} from '$/service/envValues'
import server from '$/$server'
import ws from '@fastify/websocket'
import encryption from "$/service/encryption";
import {PrismaClient} from "@prisma/client";
import _ from 'lodash'
import fs from 'fs'
import * as process from "process";
const seed = async () => {
    const prisma = new PrismaClient()
    const userrole1 = await prisma.userRole.upsert({
        where: { id: 1 },
        update: {},
        create: {
            value: "Administrator"
        }
    })

    const userrole2 = await prisma.userRole.upsert({
        where: { id: 2 },
        update: {},
        create: {
            value: "Default User"
        }
    })
    let admin = await prisma.user.findFirst({where: {id: 1}})
    if (_.isNull(admin)) {
        admin = await prisma.user.create({
            data: {
                email: "",
                username: "admin",
                password: "",
                active: true,
                roles: {
                    connect: [{id: userrole1.id}]
                },
                imageURL: "",
            }
        })
    }

    await encryption.hashAndStore(admin.id, "admin");

    const warehouseSearch = await prisma.warehouse.findFirst({where: {id: 1}})
    if(_.isNull(warehouseSearch)) {
        await prisma.warehouse.create({data: {
            address: "1 Apple Park Way, Cupertino, CA 95014",
            name: "Default Warehouse"
            }})
    }
}

export const init = (serverFactory?: FastifyServerFactory) => {
    seed()
    const app = Fastify({ serverFactory })
    app.register(helmet, {
        crossOriginResourcePolicy: {
            policy: 'cross-origin'
        },
        permittedCrossDomainPolicies: {permittedPolicies: 'all'},
        contentSecurityPolicy: true,
        referrerPolicy: true,
        crossOriginEmbedderPolicy: true,
        crossOriginOpenerPolicy: true,
        global: true
    } as FastifyHelmetOptions)
    app.register(cors, {
        origin: true,
        allowedHeaders: '*',
        strictPreflight: false,
        preflightContinue: true,
        credentials: true,

    } as FastifyCorsOptions)
    app.register(ws)
    app.register(fastifyStatic, {
        root: path.join(__dirname, 'static'),
        prefix: '/static/',

    })
    if (API_UPLOAD_DIR) {
        try {
            if (!fs.existsSync(API_UPLOAD_DIR)) {
                fs.mkdirSync(API_UPLOAD_DIR, {recursive: true})
            }
        } catch (e) {
            console.error('Could not create upload directory. Exiting...')
            process.exit(1)
        }
        app.after(() => {
            app.register(fastifyStatic, {
                root: API_UPLOAD_DIR,
                prefix: '/uploads/',
                decorateReply: false
            })
        })
    }
    app.register(fastifyJwt, { secret: API_JWT_SECRET })

    // app.get('/ws-refresh', {websocket: true}, (connection, req) => {
    //   connection.socket.on('message', (message: any) => {
    //     connection.socket.send('')
    //   })
    // })

    server(app, { basePath: API_BASE_PATH })
    return app
}
