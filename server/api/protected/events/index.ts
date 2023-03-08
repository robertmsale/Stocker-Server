import {Events} from "@prisma/client";

export type Methods = {
    get: {
        reqHeader: {
          authorization: string
        }
        resBody: Events[]
    }
}