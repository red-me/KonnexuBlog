-- DropForeignKey
ALTER TABLE `activity` DROP FOREIGN KEY `Activity_postId_fkey`;

-- AlterTable
ALTER TABLE `activity` MODIFY `postId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
