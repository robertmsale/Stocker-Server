import { defineHooks } from './$relay'
import prisma from '$/service/prisma'
import _ from 'lodash'
export default defineHooks(() => ({
  onRequest: async (req, reply, done) => {
    // const usr = await prisma.user.findFirst({where: {id: req.user.id}, include: {roles: true}})
    // if (!_.isNull(usr) && usr.roles.reduce((prev, next) => prev || next.id === 1, false)) {}
    // else {
    //   reply.code(401)
    //   reply.send()
    // }
  }
}))
