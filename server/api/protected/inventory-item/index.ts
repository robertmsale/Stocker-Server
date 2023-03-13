import {Except, Merge, SetRequired} from 'type-fest'
import {InventoryItem, Prisma} from '$prisma/client'


export type Methods = {
    get: {
        reqHeader: {
          authorization: string
        }
        query: Merge<Partial<InventoryItem>, {
            limit?: number,
            select?: [keyof InventoryItem]
        }>
        reqBody?: Prisma.InventoryItemFindManyArgs
        resBody: InventoryItem[]
    }

    post: {
        reqHeader: {
          authorization: string
        }
        reqBody: Except<InventoryItem, 'id'>
        resBody: InventoryItem
    }

    patch: {
        reqHeader: {
          authorization: string
        }
        reqBody: SetRequired<Partial<InventoryItem>, 'id'>,
        resBody: InventoryItem
    }

    delete: {
        reqHeader: {
          authorization: string
        }
        reqBody: [number]
        resBody: {status: 'ok' | 'failed'}
    }
}