import {User} from "$prisma/client";
import {Except} from "type-fest";

export type Methods = {
    get: {
        resBody: Except<User, 'password'>
    }
}