/*
  Warnings:

  - You are about to drop the column `userLocationId` on the `InventoryItem` table. All the data in the column will be lost.
  - You are about to drop the column `userLocationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserLocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `InventoryItem` DROP FOREIGN KEY `InventoryItem_userLocationId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_userLocationId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLocation` DROP FOREIGN KEY `UserLocation_warehouseId_fkey`;

-- AlterTable
ALTER TABLE `InventoryItem` DROP COLUMN `userLocationId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userLocationId`;

-- DropTable
DROP TABLE `UserLocation`;

-- AddForeignKey
ALTER TABLE `InventoryItem` ADD CONSTRAINT `InventoryItem_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
