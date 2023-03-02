-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "cost" DECIMAL NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL
);
