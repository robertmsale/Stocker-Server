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
        return {status: 200, body: rv}
    },
    patch: async ({body}) => {
        const rv = await prisma.inventoryItemData.update({data: _.omit(body, 'id'), where: {id: body.id}})
        return {status: 200, body: rv}
    }
}))