import {PrismaClient, UserRole} from "@prisma/client";
import {Except} from "type-fest";


export type Methods = {
    get: {
        reqHeader: {
          authorization: string
        }
        query?: {id: number},
        resBody: UserRole[]
    }
    post: {
        reqHeader: {
          authorization: string
        }
        reqBody: Except<UserRole, 'id'>,
        resBody: UserRole
    }
}