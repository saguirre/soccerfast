/*
  Warnings:

  - Added the required column `userId` to the `MatchBracketScorer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MatchBracketScorer` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `MatchBracketScorer` ADD CONSTRAINT `MatchBracketScorer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
