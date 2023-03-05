import {defineController} from './$relay'
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default defineController(() => ({
    get: async () => {
        const res = await prisma.events.findMany()
        return {status: 200, body: res}
    }
}))