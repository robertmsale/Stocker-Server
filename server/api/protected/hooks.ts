import { defineHooks } from './$relay'
import {PrismaClient} from "@prisma/client";
import {RedisCommand} from "$/service/redisCache";
import _ from 'lodash'
import prisma from '$/service/prisma'
import jwt from 'jsonwebtoken'
import {API_JWT_SECRET} from "$/service/envValues";


export default defineHooks(() => ({
    preHandler: async (req, res) => {
        try {
            const tkn = jwt.verify(req.cookies.token as any, API_JWT_SECRET)
            const id: number = (tkn as {id: number}).id as number

        } catch (e) {
            res.send(e)
        }
    }
}))