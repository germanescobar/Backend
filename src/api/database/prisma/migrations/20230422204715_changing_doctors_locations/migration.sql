/*
  Warnings:

  - You are about to drop the column `locationId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `headquarterId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headquearterId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_locationId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "locationId",
ADD COLUMN     "headquarterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "locationId",
ADD COLUMN     "headquearterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_headquarterId_fkey" FOREIGN KEY ("headquarterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_headquearterId_fkey" FOREIGN KEY ("headquearterId") REFERENCES "Headquarter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
