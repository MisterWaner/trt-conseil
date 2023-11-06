/*
  Warnings:

  - The primary key for the `offer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `offer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_offerId_fkey`;

-- AlterTable
ALTER TABLE `application` MODIFY `offerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `offer` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`reference`);

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_offerId_fkey` FOREIGN KEY (`offerId`) REFERENCES `Offer`(`reference`) ON DELETE RESTRICT ON UPDATE CASCADE;
