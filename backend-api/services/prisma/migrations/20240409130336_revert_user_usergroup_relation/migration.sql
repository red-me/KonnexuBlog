/*
  Warnings:

  - You are about to drop the column `userGroupName` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userGroupName_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `userGroupName`,
    ADD COLUMN `userGroupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userGroupId_fkey` FOREIGN KEY (`userGroupId`) REFERENCES `UserGroup`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
