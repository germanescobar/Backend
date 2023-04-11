-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_patientId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "patientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "PatientId"("id") ON DELETE SET NULL ON UPDATE CASCADE;
