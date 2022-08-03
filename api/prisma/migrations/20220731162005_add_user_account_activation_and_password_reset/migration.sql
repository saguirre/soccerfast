-- AlterTable
ALTER TABLE `User` ADD COLUMN `activated` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `activationToken` VARCHAR(191) NULL,
    ADD COLUMN `locked` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `passwordRecoveryToken` VARCHAR(191) NULL;
