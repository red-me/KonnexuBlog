/*
  Warnings:

  - You are about to drop the column `description` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `file` DROP COLUMN `description`,
    DROP COLUMN `title`;
