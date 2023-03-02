import {InventoryItemData} from "$prisma/client";
import {Except, SetRequired} from "type-fest";

export type Methods = {
    get: {
        query?: Partial<InventoryItemData>,
        resBody: InventoryItemData[]
    }
    post: {
        reqBody: Except<InventoryItemData, 'id'>
        resBody: InventoryItemData
    }
    patch: {
        reqBody: SetRequired<Partial<InventoryItemData>, 'id'>
        resBody: InventoryItemData
    }
}