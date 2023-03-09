import { defineController } from './$relay'
import { getUserInfoById, changeIcon } from '$/service/user'
import prisma from '$/service/prisma'
import _ from 'lodash'
import {v1 as uuid} from 'uuid'
import {API_ORIGIN, API_UPLOAD_DIR} from "$/service/envValues";
import path from "path";
import {Except} from "type-fest";
import {User} from "$prisma/client";

const defaultImagePath = `${API_ORIGIN}/static/icons/dummy.svg`
const genImagePath = (img: string) => `${API_ORIGIN}/upload/profile-images/${img}`
const relImagePath = (img: string) => path.resolve(API_UPLOAD_DIR, 'profile-images', img)

export default defineController(() => ({
    get: async (req) => {
        if (_.isUndefined(req.query.id)) {
            let rv = await prisma.user.findMany()
            return {status: 200, body: rv.map(v => _.omit(v, 'password') as Except<User, 'password'>)}
        }
        let rv = await prisma.user.findFirst({where: {id: req.query.id}, select: {password: false}})
        if (_.isNull(rv)) return {status: 404}
        return {status: 200, body: [_.omit(rv, 'password') as Except<User, 'password'>]}
    }
}))
