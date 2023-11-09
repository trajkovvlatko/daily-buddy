-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CallLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` TEXT NOT NULL,
    `personId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `person`(`personId`),
    INDEX `user`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
