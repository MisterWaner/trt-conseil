/*
  Warnings:

  - You are about to drop the column `name` on the `Recruiter` table. All the data in the column will be lost.
  - Added the required column `societyName` to the `Recruiter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recruiter" DROP COLUMN "name",
ADD COLUMN     "societyName" TEXT NOT NULL;
