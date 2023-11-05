-- AlterTable
ALTER TABLE `user` MODIFY `address` VARCHAR(191) NULL,
    MODIFY `firstname` VARCHAR(191) NULL,
    MODIFY `isApproved` BOOLEAN NULL DEFAULT false,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `societyName` VARCHAR(191) NULL;
