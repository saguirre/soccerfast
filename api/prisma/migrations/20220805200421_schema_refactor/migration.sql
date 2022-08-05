-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `activated` BOOLEAN NULL DEFAULT false,
    `activationToken` VARCHAR(300) NULL,
    `passwordRecoveryToken` VARCHAR(300) NULL,
    `locked` BOOLEAN NULL DEFAULT false,
    `birthday` DATETIME(3) NULL,
    `preferredLanguage` VARCHAR(191) NULL DEFAULT 'en',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRole` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `active` BOOLEAN NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `active` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentTeam` (
    `tournamentId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`tournamentId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTeam` (
    `userId` INTEGER NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `teamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentMatchDate` (
    `tournamentId` INTEGER NOT NULL,
    `matchDateId` INTEGER NOT NULL,

    PRIMARY KEY (`tournamentId`, `matchDateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentTeamScore` (
    `tournamentId` INTEGER NOT NULL,
    `teamScoreId` INTEGER NOT NULL,

    PRIMARY KEY (`tournamentId`, `teamScoreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamScore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
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
CREATE TABLE `MatchDate` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `date` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchDateBracket` (
    `time` VARCHAR(191) NULL,
    `matchAlreadyHappened` BOOLEAN NULL DEFAULT false,
    `firstTeamId` INTEGER NOT NULL,
    `secondTeamId` INTEGER NOT NULL,
    `matchDateId` INTEGER NULL,

    PRIMARY KEY (`firstTeamId`, `secondTeamId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchBracketTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchBracketTeamScorer` (
    `matchBracketTeamId` INTEGER NOT NULL,
    `matchBracketScorerId` INTEGER NOT NULL,

    PRIMARY KEY (`matchBracketTeamId`, `matchBracketScorerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TournamentTopScorer` (
    `tournamentId` INTEGER NOT NULL,
    `topScorerId` INTEGER NOT NULL,

    PRIMARY KEY (`tournamentId`, `topScorerId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TopScorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `teamId` INTEGER NULL,
    `goals` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchBracketScorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleNumber` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clause` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `additionalInfo` VARCHAR(191) NULL,
    `ruleId` INTEGER NOT NULL,

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
CREATE TABLE `Announcement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `announcementTypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AnnouncementType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `notificationTypeId` INTEGER NOT NULL,
    `notificationRouteId` INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTeam` ADD CONSTRAINT `TournamentTeam_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTeam` ADD CONSTRAINT `TournamentTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentMatchDate` ADD CONSTRAINT `TournamentMatchDate_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentMatchDate` ADD CONSTRAINT `TournamentMatchDate_matchDateId_fkey` FOREIGN KEY (`matchDateId`) REFERENCES `MatchDate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTeamScore` ADD CONSTRAINT `TournamentTeamScore_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTeamScore` ADD CONSTRAINT `TournamentTeamScore_teamScoreId_fkey` FOREIGN KEY (`teamScoreId`) REFERENCES `TeamScore`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_firstTeamId_fkey` FOREIGN KEY (`firstTeamId`) REFERENCES `MatchBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_secondTeamId_fkey` FOREIGN KEY (`secondTeamId`) REFERENCES `MatchBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_matchDateId_fkey` FOREIGN KEY (`matchDateId`) REFERENCES `MatchDate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchBracketTeamScorer` ADD CONSTRAINT `MatchBracketTeamScorer_matchBracketTeamId_fkey` FOREIGN KEY (`matchBracketTeamId`) REFERENCES `MatchBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchBracketTeamScorer` ADD CONSTRAINT `MatchBracketTeamScorer_matchBracketScorerId_fkey` FOREIGN KEY (`matchBracketScorerId`) REFERENCES `MatchBracketScorer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTopScorer` ADD CONSTRAINT `TournamentTopScorer_tournamentId_fkey` FOREIGN KEY (`tournamentId`) REFERENCES `Tournament`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TournamentTopScorer` ADD CONSTRAINT `TournamentTopScorer_topScorerId_fkey` FOREIGN KEY (`topScorerId`) REFERENCES `TopScorer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopScorer` ADD CONSTRAINT `TopScorer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TopScorer` ADD CONSTRAINT `TopScorer_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clause` ADD CONSTRAINT `Clause_ruleId_fkey` FOREIGN KEY (`ruleId`) REFERENCES `Rule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
