import { defineHooks } from './$relay'
import jwt from "jsonwebtoken";
import {API_JWT_SECRET} from "$/service/envValues";
import prisma from "$/service/prisma";
import _ from 'lodash'

export default defineHooks(() => ({
    preHandler: async (req, res) => {
        console.log(req.cookies)
        const tkn = req.cookies.token
        console.log(tkn)
        const decoded = jwt.verify(tkn as string, API_JWT_SECRET)
        const id = (decoded as {id: number}).id
        const user = await prisma.user.findFirst({where: { id }})
        if (_.isNull(user)) {
            res.code(404)
                .send()
        }
        res
            .code(200)
            .send(user)
    }
}))
