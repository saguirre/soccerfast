-- DropForeignKey
ALTER TABLE `BracketTeamScorer` DROP FOREIGN KEY `BracketTeamScorer_userId_fkey`;

-- AlterTable
ALTER TABLE `BracketTeamScorer` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `BracketTeamScorer` ADD CONSTRAINT `BracketTeamScorer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
