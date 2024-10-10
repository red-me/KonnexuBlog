/*
  Warnings:

  - You are about to alter the column `content` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - Added the required column `type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `type` VARCHAR(25) NOT NULL,
    MODIFY `content` JSON NULL;
