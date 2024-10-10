/*
  Warnings:

  - You are about to drop the column `postGroupId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `postgroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_postGroupId_fkey`;

-- DropForeignKey
ALTER TABLE `postgroup` DROP FOREIGN KEY `PostGroup_userId_fkey`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `postGroupId`,
    ADD COLUMN `description` VARCHAR(5000) NOT NULL DEFAULT '',
    MODIFY `title` VARCHAR(255) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `postgroup`;
