import { defineController } from './$relay'
import {InventoryItem, InventoryItemData} from '$prisma/client'
import _ from 'lodash'
import prisma from '$/service/prisma'

export default defineController(() => ({
    get: async ({query}) => {
        const selectsafe: [keyof InventoryItem] = _.isUndefined(query) || _.isUndefined(query.select) ? [] as unknown as [keyof InventoryItem] : query.select
        const select = _.isEmpty(selectsafe) ? {} : _.zipObject(selectsafe, _.repeat(" ", selectsafe.length).split(' ').map(() => true))
        const where = _.omitBy(query, (v, k) => k == 'select' || k == 'limit' || _.isUndefined(v))
        const take = _.isUndefined(query) || _.isUndefined(query.limit) ? 1000000 : query.limit
        const items = await prisma.inventoryItem.findMany(
            _.merge(select, take, where) as never
        )
        return { status: 200, body: items}
    },
    post: async ({body}) => {

        const rv = await prisma.inventoryItem.create({data: body})
        const data = await prisma.inventoryItemData.findFirst({where: {id: rv.dataId}})
        await prisma.events.create({data: {
                description: `{username} scanned in a new item: ${data?.name ?? ""}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    },
    patch: async ({body}) => {
        const rv = await prisma.inventoryItem.update({
            data: _.omit(body, 'id'),
            where: { id: body.id }
        })
        const data = await prisma.inventoryItemData.findFirst({where: {id: rv.dataId}})
        await prisma.events.create({data: {
                description: `{username} updated an item's information: ${data?.name ?? ""}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    },
    delete: async ({body}) => {
        for (let id of body) {
            const rv = await prisma.inventoryItem.findFirst({where: {id}})
            const data = await prisma.inventoryItemData.findFirst({where: {id: rv?.dataId ?? 0}})
            await prisma.events.create({data: {
                    description: `{username} scanned an item out of stock: ${data?.name ?? ""}`,
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