import { defineController } from './$relay'
import _ from 'lodash'
import prisma from '$/service/prisma'
export default defineController(() => ({
    get: async ({ query }) => {
        if(_.isUndefined(query.id)) {
            let rv = await prisma.userRole.findMany()
            return {status: 200, body: _.isNull(rv) ? [] : rv}
        }
        let rv = await prisma.userRole.findFirst({
            where: {id: query.id},
        })
        return {status: 200, body: _.isNull(rv) ? [] : [rv]}
    },
    post: async ({ body }) => {
        let rv = await prisma.userRole.create({
            data: body
        })
        return {status: 201, body: rv}
    }
}))