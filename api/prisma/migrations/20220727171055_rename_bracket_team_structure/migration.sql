/*
  Warnings:

  - You are about to drop the `TeamBracket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamBracketItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamBracketScorer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TournamentFixtureItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TeamBracket` DROP FOREIGN KEY `TeamBracket_leftTeamBracketItemId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamBracket` DROP FOREIGN KEY `TeamBracket_rightTeamBracketItemId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamBracket` DROP FOREIGN KEY `TeamBracket_tournamentFixtureItemId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamBracketScorer` DROP FOREIGN KEY `TeamBracketScorer_teamBracketItemId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamBracketScorer` DROP FOREIGN KEY `TeamBracketScorer_tournamentTopScoreId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamBracketScorer` DROP FOREIGN KEY `TeamBracketScorer_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TournamentFixtureItem` DROP FOREIGN KEY `TournamentFixtureItem_tournamentFixtureId_fkey`;

-- DropTable
DROP TABLE `TeamBracket`;

-- DropTable
DROP TABLE `TeamBracketItem`;

-- DropTable
DROP TABLE `TeamBracketScorer`;

-- DropTable
DROP TABLE `TournamentFixtureItem`;

-- CreateTable
CREATE TABLE `MatchDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `tournamentFixtureId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchDateBracket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(191) NULL,
    `firstTeamId` INTEGER NOT NULL,
    `secondTeamId` INTEGER NOT NULL,
    `matchDateId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchDateBracketTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BracketTeamScorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NULL DEFAULT 0,
    `matchDateBracketTeamId` INTEGER NULL,
    `userId` INTEGER NOT NULL,
    `tournamentTopScoreId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MatchDate` ADD CONSTRAINT `MatchDate_tournamentFixtureId_fkey` FOREIGN KEY (`tournamentFixtureId`) REFERENCES `TournamentFixture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_firstTeamId_fkey` FOREIGN KEY (`firstTeamId`) REFERENCES `MatchDateBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_secondTeamId_fkey` FOREIGN KEY (`secondTeamId`) REFERENCES `MatchDateBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_matchDateId_fkey` FOREIGN KEY (`matchDateId`) REFERENCES `MatchDate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_matchDateBracketTeamId_fkey` FOREIGN KEY (`matchDateBracketTeamId`) REFERENCES `MatchDateBracketTeam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_tournamentTopScoreId_fkey` FOREIGN KEY (`tournamentTopScoreId`) REFERENCES `TournamentTopScore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
