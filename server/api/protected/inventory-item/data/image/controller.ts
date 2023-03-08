import { defineController } from './$relay'
import fs, {file} from 'fs-jetpack'
import {API_ORIGIN, API_UPLOAD_DIR} from "$/service/envValues";
import _ from 'lodash'
import prisma from '$/service/prisma'
import path from "path";
import { v1 as uuid } from 'uuid'
import dirs from '$/service/dirs'

const defaultImagePath = `${API_ORIGIN}/static/icons/dummy.svg`
const genImagePath = (img: string) => `${API_ORIGIN}/upload/item-images/${img}`
const relImagePath = (img: string) => path.resolve(API_UPLOAD_DIR, 'item-images', img)
export default defineController(() => ({
    get: async ({query}) => {
        if (_.isUndefined(query)) return {status: 200, body: defaultImagePath}
        const idata = await prisma.inventoryItemData.findFirst({where: {id: query.id}})
        if (_.isNull(idata)) return {status: 200, body: defaultImagePath}
        const relpath = relImagePath(idata.imageURL)
        if (!fs.exists(relpath)) return {status: 200, body: defaultImagePath}
        return { status: 200, body: genImagePath(idata.imageURL)}
    },
    post: async ({body, query}) => {
        const filename = `${uuid()}${path.extname(body.icon.filename)}`

        const filepath = ``
        await fs.writeAsync(filename, await body.icon.toBuffer())
        await prisma.inventoryItemData.update({where: {id: query.id}, data: {imageURL: ``}})
        return {status: 200, body: genImagePath(path.basename(filename))}
    }
}))
