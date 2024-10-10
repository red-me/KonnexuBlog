/*
  Warnings:

  - You are about to drop the column `module` on the `app` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `app` DROP COLUMN `module`,
    ADD COLUMN `modules` JSON NULL;
