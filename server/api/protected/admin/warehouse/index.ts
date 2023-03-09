import {AspidaMethods} from 'aspida'
import {Warehouse} from "@prisma/client";
import {Except, SetRequired} from "type-fest";
export type Methods = {
    get: {
        query: {id?: number}
        resBody: Warehouse[]
    }
    post: {
        reqBody: Except<Warehouse, 'id'>,
        resBody: Warehouse
    }

    patch: {
        reqBody: SetRequired<Partial<Warehouse>, 'id'>,
        resBody: Warehouse
    }

    delete: {
        query: { id: number }
    }
}

const derp = {
    get: {

    }
} as AspidaMethods