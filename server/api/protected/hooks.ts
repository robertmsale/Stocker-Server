import {FastifyRequest} from "fastify";
import {Merge} from "type-fest";
import {defineHooks} from './$relay'
import jwt from '$/service/jwt'
import {API_JWT_SECRET} from "$/service/envValues";
import {User} from "$prisma/client";
import prisma from "$/service/prisma";

export type AdditionalRequest = {
    headers: {
        authorization: string
    }
    user: User
}

export default defineHooks(() => ({
    preHandler: async (req, res) => {
        const decoded = jwt.verify(req.headers.authorization)
        const user = await prisma.user.findFirst({where: {id: decoded.id}, include: {roles: true}})
        if (!user) {
            res.status(401).send({message: 'Invalid token'})
            return
        }
        const isAdmin = user.roles.some(role => role.id === 1)
        if (user.active === false && !isAdmin) {
            res.status(401).send({message: 'User is not active'})
            return
        }
        req.user = user
    }
}))