/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_ownerId_fkey`;

-- AlterTable
ALTER TABLE `Team` DROP COLUMN `ownerId`;

-- CreateTable
CREATE TABLE `_owners` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_owners_AB_unique`(`A`, `B`),
    INDEX `_owners_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_players` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_players_AB_unique`(`A`, `B`),
    INDEX `_players_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_owners` ADD CONSTRAINT `_owners_A_fkey` FOREIGN KEY (`A`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_owners` ADD CONSTRAINT `_owners_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_players` ADD CONSTRAINT `_players_A_fkey` FOREIGN KEY (`A`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_players` ADD CONSTRAINT `_players_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
