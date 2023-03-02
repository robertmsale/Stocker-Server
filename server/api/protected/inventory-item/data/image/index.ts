import {ReadStream} from "fs";

export type Methods = {
    get: {
        query?: {id: number},
        resBody: string
    }
    post: {
        reqFormat: FormData,
        reqBody: { icon: File | ReadStream }
        resBody: string
    }
}