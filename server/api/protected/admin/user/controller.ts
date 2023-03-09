import {defineController} from './$relay'
import prisma from "$/service/prisma";
import _ from 'lodash'

export default defineController(() => ({
    post: async ({body}) => {
        console.log(body)
        return {status: 200, body: await prisma.user.create({data: {
            email: body.email,
            username: body.username,
            password: body.password,
            active: body.active,
            roles: {
                connect: _.isUndefined(body.roles) ? [] : body.roles.map(v => ({id: v.id}))
            },
            imageURL: body.imageURL,
                }})}
    },
    patch: async ({body}) => {
        let rv = await prisma.user.update({where: {id: body.id}, data: {
            email: body.email,
            username: body.username,
            password: body.password,
            active: body.active,
            roles: {
                connect: _.isUndefined(body.roles) ? [] : body.roles.map(v => ({id: v.id})),
            },
            imageURL: body.imageURL,
            }})
        return {status: 200, body: rv}
    }
}))
