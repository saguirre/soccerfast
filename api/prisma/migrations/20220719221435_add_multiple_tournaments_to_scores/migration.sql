/*
  Warnings:

  - You are about to drop the column `tournamentId` on the `Tournament_Team_Score` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tournament_Team_Score` DROP FOREIGN KEY `Tournament_Team_Score_tournamentId_fkey`;

-- AlterTable
ALTER TABLE `Tournament_Team_Score` DROP COLUMN `tournamentId`;

-- CreateTable
CREATE TABLE `_TournamentToTournament_Team_Score` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TournamentToTournament_Team_Score_AB_unique`(`A`, `B`),
    INDEX `_TournamentToTournament_Team_Score_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TournamentToTournament_Team_Score` ADD CONSTRAINT `_TournamentToTournament_Team_Score_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentToTournament_Team_Score` ADD CONSTRAINT `_TournamentToTournament_Team_Score_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tournament_Team_Score`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
