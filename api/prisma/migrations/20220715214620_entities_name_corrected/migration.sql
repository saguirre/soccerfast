/*
  Warnings:

  - You are about to drop the `announcementtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contactemail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contactinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contactphone` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contactsocialmedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notificationroute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notificationtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teampicture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tournamentteamscore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `announcement` DROP FOREIGN KEY `Announcement_announcementTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `contactemail` DROP FOREIGN KEY `ContactEmail_contactInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `contactphone` DROP FOREIGN KEY `ContactPhone_contactInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `contactsocialmedia` DROP FOREIGN KEY `ContactSocialMedia_contactInfoId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_notificationRouteId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_notificationTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `teampicture` DROP FOREIGN KEY `TeamPicture_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `tournamentteamscore` DROP FOREIGN KEY `TournamentTeamScore_teamId_fkey`;

-- DropForeignKey
ALTER TABLE `tournamentteamscore` DROP FOREIGN KEY `TournamentTeamScore_tournamentId_fkey`;

-- DropTable
DROP TABLE `announcementtype`;

-- DropTable
DROP TABLE `contactemail`;

-- DropTable
DROP TABLE `contactinfo`;

-- DropTable
DROP TABLE `contactphone`;

-- DropTable
DROP TABLE `contactsocialmedia`;

-- DropTable
DROP TABLE `notificationroute`;

-- DropTable
DROP TABLE `notificationtype`;

-- DropTable
DROP TABLE `teampicture`;

-- DropTable
DROP TABLE `tournamentteamscore`;

-- CreateTable
CREATE TABLE `Team_Picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NULL,
    `base64Image` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournament_Team_Score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NOT NULL,
    `tournamentId` INTEGER NOT NULL,
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
CREATE TABLE `Contact_Info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `companyPhrase` VARCHAR(191) NOT NULL,
    `companyLogo` VARCHAR(191) NOT NULL,
    `companyLogoUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact_Social_Media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `contactInfoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact_Phone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `contactInfoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact_Email` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `contactInfoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Announcement_Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_Route` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `route` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team_Picture` ADD CONSTRAINT `Team_Picture_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament_Team_Score` ADD CONSTRAINT `Tournament_Team_Score_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tournament_Team_Score` ADD CONSTRAINT `Tournament_Team_Score_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact_Social_Media` ADD CONSTRAINT `Contact_Social_Media_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `Contact_Info`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact_Phone` ADD CONSTRAINT `Contact_Phone_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `Contact_Info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact_Email` ADD CONSTRAINT `Contact_Email_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `Contact_Info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Announcement` ADD CONSTRAINT `Announcement_announcementTypeId_fkey` FOREIGN KEY (`announcementTypeId`) REFERENCES `Announcement_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notificationTypeId_fkey` FOREIGN KEY (`notificationTypeId`) REFERENCES `Notification_Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_notificationRouteId_fkey` FOREIGN KEY (`notificationRouteId`) REFERENCES `Notification_Route`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
