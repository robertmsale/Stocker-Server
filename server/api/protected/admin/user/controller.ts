import {defineController} from './$relay'
import prisma from "$/service/prisma";
import _ from 'lodash'

export default defineController(() => ({
    post: async ({body}) => {
        return {status: 200, body: await prisma.user.create({data: body})}
    },
    patch: async ({body}) => {
        let rv = await prisma.user.update({where: {id: body.id}, data: _.omit(body, 'id')})
        return {status: 200, body: rv}
    }
}))
