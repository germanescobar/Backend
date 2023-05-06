/*
  Warnings:

  - You are about to drop the column `address` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "address",
DROP COLUMN "city";

-- CreateTable
CREATE TABLE "Headquarter" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Headquarter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Headquarter" ADD CONSTRAINT "Headquarter_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
