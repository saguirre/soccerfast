/*
  Warnings:

  - You are about to drop the `Announcement_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact_Email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact_Info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact_Phone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contact_Social_Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification_Route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team_Picture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tournament_Team_Score` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TournamentToTournament_Team_Score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Announcement` DROP FOREIGN KEY `Announcement_announcementTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact_Email` DROP FOREIGN KEY `Contact_Email_contactInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact_Phone` DROP FOREIGN KEY `Contact_Phone_contactInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `Contact_Social_Media` DROP FOREIGN KEY `Contact_Social_Media_contactInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_notificationRouteId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_notificationTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `Team_Picture` DROP FOREIGN KEY `Team_Picture_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `Tournament_Team_Score` DROP FOREIGN KEY `Tournament_Team_Score_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `_TournamentToTournament_Team_Score` DROP FOREIGN KEY `_TournamentToTournament_Team_Score_A_fkey`;

-- DropForeignKey
ALTER TABLE `_TournamentToTournament_Team_Score` DROP FOREIGN KEY `_TournamentToTournament_Team_Score_B_fkey`;

-- AlterTable
ALTER TABLE `Tournament` ADD COLUMN `tournamentFixtureId` INTEGER NULL,
    ADD COLUMN `tournamentTopGoalkeepersId` INTEGER NULL,
    ADD COLUMN `tournamentTopScoreId` INTEGER NULL;

-- DropTable
DROP TABLE `Announcement_Type`;

-- DropTable
DROP TABLE `Contact_Email`;

-- DropTable
DROP TABLE `Contact_Info`;

-- DropTable
DROP TABLE `Contact_Phone`;

-- DropTable
DROP TABLE `Contact_Social_Media`;

-- DropTable
DROP TABLE `Notification_Route`;

-- DropTable
DROP TABLE `Notification_Type`;

-- DropTable
DROP TABLE `Team_Picture`;

-- DropTable
DROP TABLE `Tournament_Team_Score`;

-- DropTable
DROP TABLE `_TournamentToTournament_Team_Score`;

-- CreateTable
CREATE TABLE `TeamPicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NULL,
    `base64Image` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentTopScore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentTopGoalkeepers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentGoalkeepers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goalsAgainst` INTEGER NOT NULL DEFAULT 0,
    `teamId` INTEGER NULL,
    `tournamentTopGoalkeepersId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentTeamScore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `matchesPlayed` INTEGER NOT NULL DEFAULT 0,
    `matchesWon` INTEGER NOT NULL DEFAULT 0,
    `matchesTied` INTEGER NOT NULL DEFAULT 0,
    `matchesLost` INTEGER NOT NULL DEFAULT 0,
    `goalsAhead` INTEGER NOT NULL DEFAULT 0,
    `goalsAgainst` INTEGER NOT NULL DEFAULT 0,
    `points` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentFixture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamBracket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(191) NULL,
    `leftTeamBracketItemId` INTEGER NOT NULL,
    `rightTeamBracketItemId` INTEGER NOT NULL,
    `tournamentFixtureId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamBracketItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamBracketScorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NOT NULL DEFAULT 0,
    `teamBracketItemId` INTEGER NULL,
    `userId` INTEGER NOT NULL,
    `tournamentTopScoreId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `companyPhrase` VARCHAR(191) NOT NULL,
    `companyLogo` VARCHAR(191) NOT NULL,
    `copyright` VARCHAR(191) NOT NULL DEFAULT '',
    `companyLogoUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactSocialMedia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `contactInfoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactPhone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `contactInfoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactEmail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `contactInfoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnnouncementType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationRoute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TournamentToTournamentTeamScore` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TournamentToTournamentTeamScore_AB_unique`(`A`, `B`),
    INDEX `_TournamentToTournamentTeamScore_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamPicture` ADD CONSTRAINT `TeamPicture_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_tournamentFixtureId_fkey` FOREIGN KEY (`tournamentFixtureId`) REFERENCES `TournamentFixture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_tournamentTopScoreId_fkey` FOREIGN KEY (`tournamentTopScoreId`) REFERENCES `TournamentTopScore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament` ADD CONSTRAINT `Tournament_tournamentTopGoalkeepersId_fkey` FOREIGN KEY (`tournamentTopGoalkeepersId`) REFERENCES `TournamentTopGoalkeepers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentGoalkeepers` ADD CONSTRAINT `TournamentGoalkeepers_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentGoalkeepers` ADD CONSTRAINT `TournamentGoalkeepers_tournamentTopGoalkeepersId_fkey` FOREIGN KEY (`tournamentTopGoalkeepersId`) REFERENCES `TournamentTopGoalkeepers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTeamScore` ADD CONSTRAINT `TournamentTeamScore_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracket` ADD CONSTRAINT `TeamBracket_leftTeamBracketItemId_fkey` FOREIGN KEY (`leftTeamBracketItemId`) REFERENCES `TeamBracketItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracket` ADD CONSTRAINT `TeamBracket_rightTeamBracketItemId_fkey` FOREIGN KEY (`rightTeamBracketItemId`) REFERENCES `TeamBracketItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracket` ADD CONSTRAINT `TeamBracket_tournamentFixtureId_fkey` FOREIGN KEY (`tournamentFixtureId`) REFERENCES `TournamentFixture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracketScorer` ADD CONSTRAINT `TeamBracketScorer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracketScorer` ADD CONSTRAINT `TeamBracketScorer_teamBracketItemId_fkey` FOREIGN KEY (`teamBracketItemId`) REFERENCES `TeamBracketItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamBracketScorer` ADD CONSTRAINT `TeamBracketScorer_tournamentTopScoreId_fkey` FOREIGN KEY (`tournamentTopScoreId`) REFERENCES `TournamentTopScore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactSocialMedia` ADD CONSTRAINT `ContactSocialMedia_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `ContactInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactPhone` ADD CONSTRAINT `ContactPhone_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `ContactInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactEmail` ADD CONSTRAINT `ContactEmail_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `ContactInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_announcementTypeId_fkey` FOREIGN KEY (`announcementTypeId`) REFERENCES `AnnouncementType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notificationTypeId_fkey` FOREIGN KEY (`notificationTypeId`) REFERENCES `NotificationType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notificationRouteId_fkey` FOREIGN KEY (`notificationRouteId`) REFERENCES `NotificationRoute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentToTournamentTeamScore` ADD CONSTRAINT `_TournamentToTournamentTeamScore_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentToTournamentTeamScore` ADD CONSTRAINT `_TournamentToTournamentTeamScore_B_fkey` FOREIGN KEY (`B`) REFERENCES `TournamentTeamScore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
