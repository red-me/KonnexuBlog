/*
  Warnings:

  - You are about to drop the column `default` on the `usergroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usergroup` DROP COLUMN `default`,
    ADD COLUMN `isDefault` BOOLEAN NOT NULL DEFAULT true;
