/*
  Warnings:

  - You are about to drop the column `userGroupId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userGroupId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userGroupId`,
    ADD COLUMN `userGroupName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userGroupName_fkey` FOREIGN KEY (`userGroupName`) REFERENCES `UserGroup`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
