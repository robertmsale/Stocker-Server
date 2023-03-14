import { defineController } from './$relay'
import prisma from "$/service/prisma";
import _ from 'lodash'

export default defineController(() => ({
    get: async ({query}) => {
        if (_.isUndefined(query.id)) {
            return {status: 200, body: await prisma.warehouse.findMany()}
        }
        const rv = await prisma.warehouse.findFirst({where: {id: query.id}})
        if (_.isNull(rv)) return {status: 404}
        return {status: 200, body: [rv]}
    },
    post: async ({body, user}) => {
        const rv = await prisma.warehouse.create({data: body}).then(res => {
            prisma.events.create({data: {
                description: `${user.username} created a new warehouse: ${res.name}`,
                    time: new Date(),
                    userid: user.id
                }})
            return res
        })
        return {status: 200, body: rv}
    },
    patch: async ({body, user}) => {
        const rv = await prisma.warehouse.update({where: {id: body.id}, data: body}).then(res => {
            prisma.events.create({data: {
                description: `${user.username} updated warehouse info: ${res.name}`,
                    time: new Date(),
                    userid: user.id
                }})
            return res
        })
        return {status: 200, body: rv}
    },
    delete: async ({query, user}) => {
        await prisma.warehouse.delete({where: {id: query.id}}).then(res => {
            prisma.events.create({data: {
                description: `${user.username} deleted warehouse: ${res.name}`,
                    time: new Date(),
                    userid: user.id
                }})
            return res
        })
        return {status: 200}
    }
}))
