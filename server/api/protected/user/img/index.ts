import {ReadStream} from "fs";

export type Methods = {
    get: {
        resBody: string
    }
    post: {
        reqFormat: FormData,
        reqBody: { icon: File | ReadStream }
        resBody: string
    }
}