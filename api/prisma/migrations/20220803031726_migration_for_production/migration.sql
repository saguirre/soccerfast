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
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

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
CREATE TABLE `TeamPicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NULL,
    `base64Image` VARCHAR(191) NOT NULL,
    `teamId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tournament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `active` BOOLEAN NULL DEFAULT false,
    `tournamentFixtureId` INTEGER NULL,
    `tournamentTopScoreId` INTEGER NULL,
    `tournamentTopGoalkeepersId` INTEGER NULL,

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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `matchAlreadyHappened` BOOLEAN NULL DEFAULT false,
    `firstTeamId` INTEGER NOT NULL,
    `secondTeamId` INTEGER NOT NULL,
    `matchDateId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchDateBracketTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NULL DEFAULT 0,
    `teamId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BracketTeamScorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `goals` INTEGER NULL DEFAULT 0,
    `matchDateBracketTeamId` INTEGER NULL,
    `userId` INTEGER NULL,
    `tournamentTopScoreId` INTEGER NULL,

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

-- CreateTable
CREATE TABLE `_TeamToTournament` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeamToTournament_AB_unique`(`A`, `B`),
    INDEX `_TeamToTournament_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TournamentToTournamentTeamScore` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TournamentToTournamentTeamScore_AB_unique`(`A`, `B`),
    INDEX `_TournamentToTournamentTeamScore_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE `MatchDate` ADD CONSTRAINT `MatchDate_tournamentFixtureId_fkey` FOREIGN KEY (`tournamentFixtureId`) REFERENCES `TournamentFixture`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_firstTeamId_fkey` FOREIGN KEY (`firstTeamId`) REFERENCES `MatchDateBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_secondTeamId_fkey` FOREIGN KEY (`secondTeamId`) REFERENCES `MatchDateBracketTeam`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracket` ADD CONSTRAINT `MatchDateBracket_matchDateId_fkey` FOREIGN KEY (`matchDateId`) REFERENCES `MatchDate`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchDateBracketTeam` ADD CONSTRAINT `MatchDateBracketTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_matchDateBracketTeamId_fkey` FOREIGN KEY (`matchDateBracketTeamId`) REFERENCES `MatchDateBracketTeam`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_tournamentTopScoreId_fkey` FOREIGN KEY (`tournamentTopScoreId`) REFERENCES `TournamentTopScore`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `_owners` ADD CONSTRAINT `_owners_A_fkey` FOREIGN KEY (`A`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_owners` ADD CONSTRAINT `_owners_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_players` ADD CONSTRAINT `_players_A_fkey` FOREIGN KEY (`A`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_players` ADD CONSTRAINT `_players_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToTournament` ADD CONSTRAINT `_TeamToTournament_A_fkey` FOREIGN KEY (`A`) REFERENCES `Team`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeamToTournament` ADD CONSTRAINT `_TeamToTournament_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentToTournamentTeamScore` ADD CONSTRAINT `_TournamentToTournamentTeamScore_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TournamentToTournamentTeamScore` ADD CONSTRAINT `_TournamentToTournamentTeamScore_B_fkey` FOREIGN KEY (`B`) REFERENCES `TournamentTeamScore`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
