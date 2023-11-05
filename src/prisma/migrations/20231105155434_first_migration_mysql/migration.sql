-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Consultant` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Candidate_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recruiter` (
    `id` VARCHAR(191) NOT NULL,
    `societyName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resume` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Resume_candidateId_key`(`candidateId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `schedules` VARCHAR(191) NOT NULL,
    `contractType` VARCHAR(191) NOT NULL,
    `publicationDate` DATETIME(3) NOT NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `recruiterId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Application` (
    `id` VARCHAR(191) NOT NULL,
    `applicationDate` DATETIME(3) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `offerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Consultant` ADD CONSTRAINT `Consultant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recruiter` ADD CONSTRAINT `Recruiter_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_recruiterId_fkey` FOREIGN KEY (`recruiterId`) REFERENCES `Recruiter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `Offer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
