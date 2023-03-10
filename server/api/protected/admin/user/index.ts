import {Except, Merge, SetRequired} from "type-fest";
import {User} from "$prisma/client";
import {UserRole} from "@prisma/client";

export type Methods = {
    get: {
        reqHeader: {
            authorization: string
        }
        query: {id: number}
        resBody: Merge<Except<User, 'password'>, {roles: UserRole[]}>
    }
    post: {
        reqHeader: {
          authorization: string
        }
        reqBody: Merge<Except<User, 'id'>, {roles?: UserRole[]}>
        resBody: Except<User, 'password'>
    }
    patch: {
        reqHeader: {
          authorization: string
        }
        reqBody: Merge<SetRequired<Partial<User>, 'id'>, {roles?: UserRole[]}>,
        resBody: Except<User, 'password'>
    }
}