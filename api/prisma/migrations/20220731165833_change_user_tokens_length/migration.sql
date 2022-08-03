-- AlterTable
ALTER TABLE `User` MODIFY `activationToken` VARCHAR(300) NULL,
    MODIFY `passwordRecoveryToken` VARCHAR(300) NULL;
