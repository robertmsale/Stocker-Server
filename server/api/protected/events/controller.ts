import {defineController} from './$relay'
import prisma from "$/service/prisma";

export default defineController(() => ({
    get: async () => {
        const res = await prisma.events.findMany()
        return {status: 200, body: res}
    }
}))