/*
  Warnings:

  - The primary key for the `TournamentTeamScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teamScoreId` on the `TournamentTeamScore` table. All the data in the column will be lost.
  - You are about to drop the `TeamScore` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `TournamentTeamScore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TournamentTeamScore` DROP FOREIGN KEY `TournamentTeamScore_teamScoreId_fkey`;

-- AlterTable
ALTER TABLE `TournamentTeamScore` DROP PRIMARY KEY,
    DROP COLUMN `teamScoreId`,
    ADD COLUMN `goalsAgainst` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `goalsAhead` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `matchesLost` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `matchesPlayed` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `matchesTied` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `matchesWon` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `points` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `teamId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`tournamentId`, `teamId`);

-- DropTable
DROP TABLE `TeamScore`;

-- AddForeignKey
ALTER TABLE `TournamentTeamScore` ADD CONSTRAINT `TournamentTeamScore_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
