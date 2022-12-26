-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `drawerId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `colorId` INTEGER NOT NULL,
    `itemTypeId` INTEGER NOT NULL,

    INDEX `user`(`userId`),
    INDEX `drawer`(`drawerId`),
    INDEX `color`(`colorId`),
    INDEX `itemType`(`itemTypeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
