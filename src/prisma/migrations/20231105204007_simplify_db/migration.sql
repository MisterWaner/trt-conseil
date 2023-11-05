/*
  Warnings:

  - You are about to drop the column `candidateId` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterId` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `resume` table. All the data in the column will be lost.
  - You are about to drop the `candidate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `consultant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recruiter` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `societyName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_candidateId_fkey`;

-- DropForeignKey
ALTER TABLE `candidate` DROP FOREIGN KEY `Candidate_userId_fkey`;

-- DropForeignKey
ALTER TABLE `consultant` DROP FOREIGN KEY `Consultant_userId_fkey`;

-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `Offer_recruiterId_fkey`;

-- DropForeignKey
ALTER TABLE `recruiter` DROP FOREIGN KEY `Recruiter_userId_fkey`;

-- DropForeignKey
ALTER TABLE `resume` DROP FOREIGN KEY `Resume_candidateId_fkey`;

-- AlterTable
ALTER TABLE `application` DROP COLUMN `candidateId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `offer` DROP COLUMN `recruiterId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `resume` DROP COLUMN `candidateId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `resumeId` VARCHAR(191) NULL,
    ADD COLUMN `societyName` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `candidate`;

-- DropTable
DROP TABLE `consultant`;

-- DropTable
DROP TABLE `recruiter`;

-- CreateIndex
CREATE UNIQUE INDEX `Resume_userId_key` ON `Resume`(`userId`);

-- AddForeignKey
ALTER TABLE `Resume` ADD CONSTRAINT `Resume_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offer` ADD CONSTRAINT `Offer_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
