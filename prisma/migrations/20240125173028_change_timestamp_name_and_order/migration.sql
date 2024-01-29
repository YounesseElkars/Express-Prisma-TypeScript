/*
  Warnings:

  - You are about to drop the column `modifiedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `modifiedAt`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
