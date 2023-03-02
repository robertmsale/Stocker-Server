/*
  Warnings:

  - You are about to alter the column `cost` on the `InventoryItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL
);
INSERT INTO "new_InventoryItem" ("cost", "currentLocation", "description", "id", "imageURL", "locationId", "name") SELECT "cost", "currentLocation", "description", "id", "imageURL", "locationId", "name" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
