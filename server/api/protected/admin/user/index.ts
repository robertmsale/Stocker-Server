import {Except, Merge, SetRequired} from "type-fest";
import {User} from "$prisma/client";
import {UserRole} from "@prisma/client";

export type Methods = {
    post: {
        reqHeader: {
          authorization: string
        }
        reqBody: Merge<Except<User, 'id'>, {roles?: UserRole[]}>
        resBody: User
    }
    patch: {
        reqHeader: {
          authorization: string
        }
        reqBody: Merge<SetRequired<Partial<User>, 'id'>, {roles?: UserRole[]}>,
        resBody: User
    }
}