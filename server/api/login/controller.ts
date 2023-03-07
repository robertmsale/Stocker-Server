import { defineController } from './$relay'
import { depend } from "velona";
import { PrismaClient } from "@prisma/client";
import { User } from '$prisma/client'
import _ from 'lodash'

const prisma = new PrismaClient()

export default defineController((fastify) => ({
    post: async ({body}) => {
        const user = await prisma.user.findFirst({where: {username: body.username}})
        if (_.isNull(user)) return {status: 404}
        if (body.password != user.password) return {status: 401}
        return {status: 201, body: { token: fastify.jwt.sign({id: user.id}), id: user.id}}
    }
}))