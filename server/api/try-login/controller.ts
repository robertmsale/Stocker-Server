import {defineController} from './$relay'
import prisma from "$/service/prisma";
import _ from 'lodash'
import {User} from "$prisma/client";

export default defineController(() => ({
    get: async (req) => {
        return {
            status: 200,
            body: {} as User
        }
    }
}))