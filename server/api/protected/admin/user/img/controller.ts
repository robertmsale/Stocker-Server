import {defineController} from './$relay'
import _ from 'lodash'
import {API_ORIGIN, API_UPLOAD_DIR} from "$/service/envValues";
import fs from 'fs-jetpack'
import path from "path";
import { v1 as uuid } from 'uuid'

import prisma from "$/service/prisma";
import jimp from "jimp";


export default defineController(() => ({
    get: async ({query}) => {
        let urlusr = await prisma.user.findFirst({where: {id: query.id}, select: {imageURL: true}})
        if (_.isNull(urlusr)) return {status: 404}
        return {status: 200, body: urlusr.imageURL}
    },
    post: async ({query, body, user}) => {
        let usr = await prisma.user.findFirst({where: {id: query.id}})
        if (_.isNull(usr)) return {status: 404}
        let imgname = `${uuid()}${path.extname(body.icon.filename)}`
        let imgpath = path.resolve(API_UPLOAD_DIR, 'profile-images', imgname)
        jimp.read(await body.icon.toBuffer()).then(img => {
            img.scaleToFit(128, 128)
            img.writeAsync(imgpath)
        })
        prisma.events.create({data: {
                description: `User ${user.username} changed profile image for ${usr.username}`,
                time: new Date,
                userid: user.id,
            }})
        await prisma.user.update({where: {id: query.id}, data: {imageURL: imgname}})
        return {status: 200, body: imgname}
    }
}))