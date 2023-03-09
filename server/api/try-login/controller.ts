import {defineController} from './$relay'
import prisma from "$/service/prisma";
import _ from 'lodash'
import {User} from "$prisma/client";
import jwt from '$/service/jwt'
import {Except} from "type-fest";

export default defineController(() => ({
    get: async (req) => {
        // @ts-ignore
        const {id} = jwt.verify(req.headers.authorization)
        const user = await prisma.user.findFirst({where: {id}})
        if (_.isNull(user)) return {status: 404}
        return {
            status: 200,
            body: _.omit(user, 'password') as Except<User, 'password'>
        }
    }
}))