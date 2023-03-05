import { defineController } from './$relay'
import {InventoryItem, InventoryItemData} from "$prisma/client";
import {PrismaClient} from '@prisma/client'
import _ from 'lodash'

const prisma = new PrismaClient()

export default defineController(() => ({
    get: async ({query}) => {
        const where = _.omitBy(query, (v, k) => k == 'select' || k == 'limit' || _.isUndefined(v))
        const items = await prisma.inventoryItemData.findMany(
            {where}
        )
        return { status: 200, body: items}
    },
    post: async ({body}) => {
        const rv = await prisma.inventoryItemData.create({data: body})
        await prisma.events.create({data: {
                description: `{username} created a new item data record: ${rv.name}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    },
    patch: async ({body}) => {
        const before = await prisma.inventoryItemData.findFirst({where: {id: body.id}})
        const rv = await prisma.inventoryItemData.update({data: _.omit(body, 'id'), where: {id: body.id}})
        await prisma.events.create({data: {
                description: `{username} updated a new item data record: ${before?.name ?? ""} -> ${rv.name}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    }
}))