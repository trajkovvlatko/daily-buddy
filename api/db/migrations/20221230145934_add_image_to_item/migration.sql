-- AlterTable
ALTER TABLE `Item` ADD COLUMN `imageFilename` VARCHAR(191) NULL,
    ADD COLUMN `imageHandle` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `user_id_due_date_completed` ON `Task`(`userId`, `dueDate`, `completed`);
