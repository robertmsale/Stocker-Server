import {PrismaClient, UserRole} from "@prisma/client";
import {Except} from "type-fest";


export type Methods = {
    get: {
        query?: {id: number},
        resBody: UserRole[]
    }
    post: {
        reqBody: Except<UserRole, 'id'>,
        resBody: UserRole
    }
}