/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Team` DROP FOREIGN KEY `Team_tournamentId_fkey`;

-- AlterTable
ALTER TABLE `Team` DROP COLUMN `tournamentId`;

-- CreateTable
CREATE TABLE `_TeamToTournament` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeamToTournament_AB_unique`(`A`, `B`),
    INDEX `_TeamToTournament_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TeamToTournament` ADD CONSTRAINT `_TeamToTournament_A_fkey` FOREIGN KEY (`A`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToTournament` ADD CONSTRAINT `_TeamToTournament_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
