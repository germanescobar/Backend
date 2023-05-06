/*
  Warnings:

  - You are about to drop the column `headquearterId` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `headquarterId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_headquearterId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "headquearterId",
ADD COLUMN     "headquarterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_headquarterId_fkey" FOREIGN KEY ("headquarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
