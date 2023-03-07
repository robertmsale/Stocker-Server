import {Except, SetRequired} from "type-fest";
import {User} from "$prisma/client";

export type Methods = {
    post: {
        reqBody: Except<User, 'id'>
        resBody: User
    }
    patch: {
        reqBody: SetRequired<Partial<User>, 'id'>,
        resBody: User
    }
}