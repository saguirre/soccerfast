/*
  Warnings:

  - The primary key for the `UserTeam` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `UserTeam` DROP PRIMARY KEY,
    ADD PRIMARY KEY (`userId`, `teamId`, `userTeamRoleId`);
