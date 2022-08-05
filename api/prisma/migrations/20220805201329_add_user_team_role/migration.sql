/*
  Warnings:

  - Added the required column `userTeamRoleId` to the `UserTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserTeam` ADD COLUMN `userTeamRoleId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `UserTeamRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTeam` ADD CONSTRAINT `UserTeam_userTeamRoleId_fkey` FOREIGN KEY (`userTeamRoleId`) REFERENCES `UserTeamRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
