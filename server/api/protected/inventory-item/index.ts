import {Except, Merge, SetRequired} from 'type-fest'
import {InventoryItem, InventoryItemData} from '$prisma/client'

export type Methods = {
    get: {
        query?: Merge<Partial<InventoryItem>, {
            limit?: number,
            select?: [keyof InventoryItem]
        }>
        resBody: InventoryItem[]
    }

    post: {
        reqBody: Except<InventoryItem, 'id'>
        resBody: InventoryItem
    }

    patch: {
        reqBody: SetRequired<Partial<InventoryItem>, 'id'>,
        resBody: InventoryItem
    }

    delete: {
        reqBody: [number]
        resBody: {status: 'ok' | 'failed'}
    }
}