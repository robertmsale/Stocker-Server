import { defineController } from './$relay'
import {InventoryItem, InventoryItemData} from '$prisma/client'
import _ from 'lodash'
import prisma from '$/service/prisma'

export default defineController(() => ({
    get: async ({query, body}) => {
        // console.log(query)
        const items = await prisma.inventoryItem.findMany(body)
        return { status: 200, body: items}
    },
    post: async ({body, user}) => {
        const rv = await prisma.inventoryItem.create({data: body})
        const data = await prisma.inventoryItemData.findFirst({where: {id: rv.dataId}})
        await prisma.events.create({data: {
                description: `${user.username} scanned in a new item: ${data?.name ?? ""}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    },
    patch: async ({body, user}) => {
        const rv = await prisma.inventoryItem.update({
            data: _.omit(body, 'id'),
            where: { id: body.id }
        })
        const data = await prisma.inventoryItemData.findFirst({where: {id: rv.dataId}})
        await prisma.events.create({data: {
                description: `${user.username} updated an item's information: ${data?.name ?? ""}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    },
    delete: async ({body, user}) => {
        for (let id of body) {
            const rv = await prisma.inventoryItem.findFirst({where: {id}})
            const data = await prisma.inventoryItemData.findFirst({where: {id: rv?.dataId ?? 0}})
            await prisma.events.create({data: {
                    description: `${user.username} scanned an item out of stock: ${data?.name ?? ""}`,
                    time: new Date(),
                    userid: 0
                }})

        }
        await prisma.inventoryItem.deleteMany({
            where: {
                id: {
                    in: body
                }
            }
        })
        return {status: 200, body: {status: 'ok'}}
    }
}))