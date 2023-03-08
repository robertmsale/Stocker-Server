import {defineController} from './$relay'
import dirs from '$/service/dirs'
import _ from 'lodash'
import prisma from "$/service/prisma";
import { v1 as uuid } from 'uuid'
import path from "path";
import {API_UPLOAD_DIR} from "$/service/envValues";
import fs from 'fs-jetpack'

export default defineController(() => ({
    get: async (req) => {
        if (_.isUndefined(req.query)) {
            return {status: 200, body: `${dirs.baseURL}${dirs.profileImages}${req.user.imageURL}`}
        }
        const user = await prisma.user.findFirst({where: {id: req.query.id}})
        if (_.isNull(user)) return {status: 404}
        return {status: 200, body: `${dirs.baseURL}${dirs.profileImages}${user.imageURL}`}
    },
    post: async (req) => {
        const {icon} = req.body
        const filename = `${uuid()}${path.extname(icon.filename)}`
        const filepath = `${API_UPLOAD_DIR}/${filename}`
        await fs.writeAsync(filepath, await icon.toBuffer())
        await prisma.user.update({where: {id: req.user.id}, data: {imageURL: filepath}})
        return {status: 200, body: filename}
    }
}))