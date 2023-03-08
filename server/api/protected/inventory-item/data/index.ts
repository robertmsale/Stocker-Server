import {InventoryItemData} from "$prisma/client";
import {Except, SetRequired} from "type-fest";

export type Methods = {
    get: {
        reqHeader: {
      authorization: string
    }
        query?: Partial<InventoryItemData>,
        resBody: InventoryItemData[]
    }
    post: {
        reqHeader: {
      authorization: string
    }
        reqBody: Except<InventoryItemData, 'id'>
        resBody: InventoryItemData
    }
    patch: {
        reqHeader: {
          authorization: string
        }
        reqBody: SetRequired<Partial<InventoryItemData>, 'id'>
        resBody: InventoryItemData
    }
}