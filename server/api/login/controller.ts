import { defineController } from './$relay'
import { depend } from "velona";
import prisma from "$/service/prisma";
import { User } from '$prisma/client'
import _ from 'lodash'
import {RedisCommand} from "$/service/redisCache";
import encryption, {CompareResult} from "$/service/encryption";
import jwt from 'jsonwebtoken'
import {API_JWT_SECRET} from "$/service/envValues";


export default defineController((fastify) => ({
    post: async (req) => {
        return {status: 200, body: {} as User}
    }
}))