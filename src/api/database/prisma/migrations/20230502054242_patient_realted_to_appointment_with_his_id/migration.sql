/*
  Warnings:

  - You are about to drop the column `patientEmail` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientEmail_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "patientEmail",
ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
