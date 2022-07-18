/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `Role` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `roleId`;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
