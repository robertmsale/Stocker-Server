-- CreateTable
CREATE TABLE "Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userid" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "time" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItemData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_InventoryItemData" ("cost", "description", "id", "imageURL", "name") SELECT "cost", "description", "id", "imageURL", "name" FROM "InventoryItemData";
DROP TABLE "InventoryItemData";
ALTER TABLE "new_InventoryItemData" RENAME TO "InventoryItemData";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
