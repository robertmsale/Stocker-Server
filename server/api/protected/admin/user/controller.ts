import {defineController} from './$relay'
import prisma from "$/service/prisma";
import _ from 'lodash'
import encryption from "$/service/encryption";

export default defineController(() => ({
    get: async ({query}) => {
        let where = {id: _.toNumber(query.id)}
        console.log(where)
        let rv = await prisma.user.findFirst({where, include: {roles: true}})
        return {status: 200, body: _.omit(rv, 'password')}
    },
    post: async ({body}) => {
        console.log(body)
        const newuser = await prisma.user.create({data: {
            email: body.email,
            username: body.username,
            password: '',
            active: body.active,
            roles: {
                connect: _.isUndefined(body.roles) ? [] : body.roles.map(v => ({id: v.id}))
            },
            imageURL: body.imageURL,
                }})
        await encryption.hashAndStore(newuser.id, body.password)
        return {status: 200, body: _.omit(newuser, 'password')}
    },
    patch: async ({body}) => {
        let rv = await prisma.user.update({where: {id: body.id}, data: {
            email: body.email,
            username: body.username,
            active: body.active,
            roles: {
                connect: _.isUndefined(body.roles) ? [] : body.roles.map(v => ({id: v.id})),
            },
            imageURL: body.imageURL,
            }})
        if (!_.isUndefined(body.password)) {
            await encryption.hashAndStore(rv.id, body.password)
        }
        return {status: 200, body: _.omit(rv, 'password')}
    }
}))
