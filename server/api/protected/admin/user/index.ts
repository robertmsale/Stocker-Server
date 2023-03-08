import {Except, SetRequired} from "type-fest";
import {User} from "$prisma/client";

export type Methods = {
    post: {
        reqHeader: {
          authorization: string
        }
        reqBody: Except<User, 'id'>
        resBody: User
    }
    patch: {
        reqHeader: {
          authorization: string
        }
        reqBody: SetRequired<Partial<User>, 'id'>,
        resBody: User
    }
}