import {ReadStream} from "fs";

export type Methods = {
    get: {
        reqHeader: {
          authorization: string
        }
        query?: {id: number},
        resBody: string
    }
    post: {
        reqHeader: {
          authorization: string
        }
        query?: {id: number}
        reqFormat: FormData,
        reqBody: { icon: File | ReadStream }
        resBody: string
    }
}