-- AlterTable
ALTER TABLE `team` MODIFY `active` BOOLEAN NULL DEFAULT true;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `active` BOOLEAN NULL DEFAULT true;
