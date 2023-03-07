import { defineController } from './$relay'
import { getUserInfoById, changeIcon } from '$/service/user'
import {PrismaClient} from "@prisma/client";
import _ from 'lodash'

const prisma = new PrismaClient()
export default defineController(() => ({
  get: async ({ query }) => {
    if (!_.isUndefined(query)) {
      let user = await prisma.user.findFirst({
        where: {id: query.id},
      })
      return {status: 200, body: _.isNull(user) ? [] : [user]}
    }
    let rv = await prisma.user.findMany()
    return {status: 200, body: _.isNull(rv) ? [] : rv}
  },
}))
