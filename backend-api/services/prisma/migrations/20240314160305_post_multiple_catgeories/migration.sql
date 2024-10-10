/*
  Warnings:

  - You are about to drop the column `postCategoryId` on the `post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_postCategoryId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `postCategoryId`;

-- CreateTable
CREATE TABLE `_PostToPostCategory` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PostToPostCategory_AB_unique`(`A`, `B`),
    INDEX `_PostToPostCategory_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PostToPostCategory` ADD CONSTRAINT `_PostToPostCategory_A_fkey` FOREIGN KEY (`A`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PostToPostCategory` ADD CONSTRAINT `_PostToPostCategory_B_fkey` FOREIGN KEY (`B`) REFERENCES `PostCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
