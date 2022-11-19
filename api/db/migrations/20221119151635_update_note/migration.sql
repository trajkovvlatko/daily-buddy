/*
  Warnings:

  - You are about to drop the column `parentId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Note` table. All the data in the column will be lost.
  - Added the required column `path` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `id_parent_id` ON `Note`;

-- DropIndex
DROP INDEX `parent_id` ON `Note`;

-- AlterTable
ALTER TABLE `Note` DROP COLUMN `parentId`,
    DROP COLUMN `title`,
    ADD COLUMN `path` VARCHAR(191) NOT NULL;
