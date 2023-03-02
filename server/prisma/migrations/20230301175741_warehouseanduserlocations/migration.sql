/*
  Warnings:

  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `cost` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `currentLocation` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `InventoryItem` table. All the data in the column will be lost.
  - Added the required column `dataId` to the `InventoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Token_userId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Token";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "InventoryItemData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "cost" REAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Warehouse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT
);

-- CreateTable
CREATE TABLE "UserLocation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "warehouseId" INTEGER,
    CONSTRAINT "UserLocation_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InventoryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataId" INTEGER NOT NULL,
    "warehouseId" INTEGER,
    "userLocationId" INTEGER,
    CONSTRAINT "InventoryItem_dataId_fkey" FOREIGN KEY ("dataId") REFERENCES "InventoryItemData" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "InventoryItem_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "Warehouse" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "InventoryItem_userLocationId_fkey" FOREIGN KEY ("userLocationId") REFERENCES "UserLocation" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_InventoryItem" ("id") SELECT "id" FROM "InventoryItem";
DROP TABLE "InventoryItem";
ALTER TABLE "new_InventoryItem" RENAME TO "InventoryItem";
CREATE UNIQUE INDEX "InventoryItem_dataId_key" ON "InventoryItem"("dataId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "userLocationId" INTEGER,
    CONSTRAINT "User_userLocationId_fkey" FOREIGN KEY ("userLocationId") REFERENCES "UserLocation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "id", "imageURL", "isAdmin", "password", "username") SELECT "email", "id", "imageURL", "isAdmin", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userLocationId_key" ON "User"("userLocationId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
