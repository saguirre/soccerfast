/*
  Warnings:

  - The primary key for the `MatchDateBracket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `firstTeamId` on the `MatchDateBracket` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamId` on the `MatchDateBracket` table. All the data in the column will be lost.
  - Added the required column `teamId` to the `MatchBracketTeam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `MatchDateBracket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MatchDateBracket` DROP FOREIGN KEY `MatchDateBracket_firstTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `MatchDateBracket` DROP FOREIGN KEY `MatchDateBracket_secondTeamId_fkey`;

-- AlterTable
ALTER TABLE `MatchBracketTeam` ADD COLUMN `teamId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `MatchDateBracket` DROP PRIMARY KEY,
    DROP COLUMN `firstTeamId`,
    DROP COLUMN `secondTeamId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `MatchDateBracketToBracketTeam` (
    `matchDateBracketId` INTEGER NOT NULL,
    `matchBracketTeamId` INTEGER NOT NULL,

    PRIMARY KEY (`matchDateBracketId`, `matchBracketTeamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MatchDateBracketToBracketTeam` ADD CONSTRAINT `MatchDateBracketToBracketTeam_matchDateBracketId_fkey` FOREIGN KEY (`matchDateBracketId`) REFERENCES `MatchDateBracket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracketToBracketTeam` ADD CONSTRAINT `MatchDateBracketToBracketTeam_matchBracketTeamId_fkey` FOREIGN KEY (`matchBracketTeamId`) REFERENCES `MatchBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchBracketTeam` ADD CONSTRAINT `MatchBracketTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
