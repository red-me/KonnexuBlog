/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `privacySettingsId` INTEGER NULL;

-- CreateTable
CREATE TABLE `PrivacySettings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `whoCanViewProfilePage` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewProfilePageInfoTab` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewBasicInfo` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewLocation` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewProfilePageActivities` VARCHAR(191) NULL DEFAULT '',
    `whoCanPostOnWall` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewFriendsList` VARCHAR(191) NULL DEFAULT '',
    `whoCanSendFriendRequest` VARCHAR(191) NULL DEFAULT '',
    `whoCanSendMessage` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewProfilePagePhotos` VARCHAR(191) NULL DEFAULT '',
    `whoCanSendPokes` VARCHAR(191) NULL DEFAULT '',
    `whoCanDisplayRSSSubscriberCount` VARCHAR(191) NULL DEFAULT '',
    `whoCanSubscribeToRSS` VARCHAR(191) NULL DEFAULT '',
    `whoCanViewProfilePageRecentlyViewedBy` VARCHAR(191) NULL DEFAULT '',
    `whoCanTagMe` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PrivacySettings_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_privacySettingsId_fkey` FOREIGN KEY (`privacySettingsId`) REFERENCES `PrivacySettings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
