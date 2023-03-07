import bcrypt from 'bcrypt'
import {PrismaClient} from "@prisma/client";
import _ from 'lodash'

const prisma = new PrismaClient()

const saltRounds = 10
type IsCorrectPassword = boolean
enum CompareResult {
    correct,
    incorrect,
    nouser
}
export default {
    hashAndStore: async (userid: number, pass: string) => {
        let hash = await bcrypt.hash(pass, saltRounds)
        await prisma.user.update({
            where: {id: userid},
            data: {
                password: hash
            }
        })
    },
    compare: async (userid: number, pass: string): Promise<CompareResult> => {
        let stored = await prisma.user.findFirst({
            where: {id: userid},
            select: {password: true},
        })
        if (_.isNull(stored)) return CompareResult.nouser
        let comparison = await bcrypt.compare(pass, stored.password)
        return comparison ? CompareResult.correct : CompareResult.incorrect
    }
}