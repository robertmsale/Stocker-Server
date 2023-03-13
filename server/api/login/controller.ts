import {defineController} from './$relay'
import prisma from "$/service/prisma";
import {User} from '$prisma/client'
import _ from 'lodash'
import encryption, {CompareResult} from "$/service/encryption";
import jwt from '$/service/jwt'


export default defineController((fastify) => ({
    post: async (req) => {
        console.log(req)
        const usr = await prisma.user.findFirst({ where: { username: req.body.username }})
        if (_.isNull(usr)) return {status: 404}
        const pass_cmp = await encryption.compare(usr.id, req.body.password)
        switch (pass_cmp) {
            case CompareResult.correct: return {status: 200, body: { user: usr, token: await jwt.sign({id: usr.id}) }}
            case CompareResult.incorrect: return {status: 401}
            case CompareResult.nouser: return {status: 404}
        }
    }
}))