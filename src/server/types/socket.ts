export enum SocketServerMessages {
    UserChanged = "UsersChanged",
    UserCreated = "UserCreated",
    UserIconUpload = "UserIconUpload",
    ItemDataChanged = "ItemDataChanged",
    ItemDataCreated = "ItemDataCreated",
    ItemDataIconUpload = "ItemDataIconUpload",
    ItemsChanged = "ItemsChanged",
    ItemCreated = "ItemCreated",
    ItemDeleted = "ItemDeleted",
    WarehouseCreated = "WarehouseCreated",
    WarehousesChanged = "WarehousesChanged",
    WarehouseDeleted = "WarehouseDeleted",
    UploadItemImage = "UploadItemImage",
    UploadProfileImage = "UploadProfileImage"
}

export enum SocketClientMessages {
    ReceiveUsers = "ReceiveUsers",
    ReceiveItemData = "ReceiveItemData",
    ReceiveItems = "ReceiveItems",
    ReceiveWarehouses = "ReceiveWarehouses",
    ReceiveEvents = "ReceiveEvents",
    ReceiveItemImageURL = "ReceiveItemImageURL",
    ReceiveProfileImageURL = "ReceiveProfileImageURL"
}