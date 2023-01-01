-- CreateTable
CREATE TABLE `Drawer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `storageUnitId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `user`(`userId`),
    INDEX `storageUnit`(`storageUnitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
