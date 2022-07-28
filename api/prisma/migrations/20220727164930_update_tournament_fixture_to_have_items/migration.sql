/*
  Warnings:

  - You are about to drop the column `tournamentFixtureId` on the `TeamBracket` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `TournamentFixture` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `TournamentFixture` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `TeamBracket` DROP FOREIGN KEY `TeamBracket_tournamentFixtureId_fkey`;

-- AlterTable
ALTER TABLE `TeamBracket` DROP COLUMN `tournamentFixtureId`,
    ADD COLUMN `tournamentFixtureItemId` INTEGER NULL;

-- AlterTable
ALTER TABLE `TournamentFixture` DROP COLUMN `date`,
    DROP COLUMN `title`;

-- CreateTable
CREATE TABLE `TournamentFixtureItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,
    `tournamentFixtureId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TournamentFixtureItem` ADD CONSTRAINT `TournamentFixtureItem_tournamentFixtureId_fkey` FOREIGN KEY (`tournamentFixtureId`) REFERENCES `TournamentFixture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracket` ADD CONSTRAINT `TeamBracket_tournamentFixtureItemId_fkey` FOREIGN KEY (`tournamentFixtureItemId`) REFERENCES `TournamentFixtureItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
