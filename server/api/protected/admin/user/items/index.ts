import {InventoryItem} from "$prisma/client";

export type Methods = {
    get: {
        query: { id: number }
        resBody: InventoryItem[]
    }
}