-- AlterTable
ALTER TABLE `MatchDateBracketTeam` ADD COLUMN `teamId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `MatchDateBracketTeam` ADD CONSTRAINT `MatchDateBracketTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
