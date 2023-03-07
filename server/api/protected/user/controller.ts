import { defineController } from './$relay'
import { getUserInfoById, changeIcon } from '$/service/user'
import prisma from '$/service/prisma'
import _ from 'lodash'
import {v1 as uuid} from 'uuid'
import {API_ORIGIN, API_UPLOAD_DIR} from "$/service/envValues";
import path from "path";

const defaultImagePath = `${API_ORIGIN}/static/icons/dummy.svg`
const genImagePath = (img: string) => `${API_ORIGIN}/upload/profile-images/${img}`
const relImagePath = (img: string) => path.resolve(API_UPLOAD_DIR, 'profile-images', img)

export default defineController(() => ({
    get: async ({ query, user }) => {
        if (!_.isUndefined(query)) {
            let user = await prisma.user.findFirst({
                where: {id: query.id},
            })
            if (_.isNull(user)) return {status: 404}
            return {status: 200, body: user}
        }
        let rv = await prisma.user.findFirst({where: {id: _.toNumber(user.id)}})
        if (_.isNull(rv)) return {status: 404}
        return {status: 200, body: rv}
    }
}))
