import { defineController } from './$relay'
import {InventoryItem, InventoryItemData} from "$prisma/client";
import prisma from '$/service/prisma'
import _ from 'lodash'


export default defineController(() => ({
    get: async ({query}) => {
        const where = _.omitBy(query, (v, k) => k == 'select' || k == 'limit' || _.isUndefined(v))
        console.log(where)
        const items = await prisma.inventoryItemData.findMany(
            {
                where: {
                    id: _.isUndefined(where.id) ? undefined : _.toNumber(where.id),
                    name: _.isUndefined(where.name) ? undefined : {contains: _.toString(where.name)},
                    description: _.isUndefined(where.description) ? undefined : {contains: _.toString(where.description)},
                    cost: _.isUndefined(where.cost) ? undefined : _.toNumber(where.cost),
                    active: _.isUndefined(where.active) ? undefined : where.active == 'true',
                },
            }
        )
        return { status: 200, body: items}
    },
    post: async ({body, user}) => {
        const rv = await prisma.inventoryItemData.create({data: body})
        await prisma.events.create({data: {
                description: `${user.username} created a new item data record: ${rv.name}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    },
    patch: async ({body, user}) => {
        const before = await prisma.inventoryItemData.findFirst({where: {id: body.id}})
        const rv = await prisma.inventoryItemData.update({data: _.omit(body, 'id'), where: {id: body.id}})
        await prisma.events.create({data: {
                description: `${user.username} updated a new item data record: ${before?.name ?? ""} -> ${rv.name}`,
                time: new Date(),
                userid: 0
            }})
        return {status: 200, body: rv}
    }
}))