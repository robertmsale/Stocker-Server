import {defineHooks} from './$relay'
import prisma from "$/service/prisma";
import _ from "lodash";
import encryption, {CompareResult} from "$/service/encryption";
import jwt from "jsonwebtoken";
import {API_JWT_SECRET} from "$/service/envValues";
import {RedisCommand} from "$/service/redisCache";
import {appendSuffixesIfMatch} from "ts-loader/dist/utils";

export default defineHooks(() => ({
    onRequest: async (req, res) => {
    },
    preHandler: async (req, res) => {
        const user = await prisma.user.findFirst({where: {username: req.body.username}})
        if (_.isNull(user)) return {status: 404}
        let result = await encryption.compare(user.id, req.body.password)
        console.log(req.headers)
        if (result === CompareResult.correct) {
            let sign = jwt.sign({id: user.id}, API_JWT_SECRET, {expiresIn: '24h'})
            res
                .cookie('token', sign)
                .code(200)
                .send(user)
        }
        res.code(result === CompareResult.incorrect ? 401 : 404)
            .send({})
    }
}))