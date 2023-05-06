/*
  Warnings:

  - You are about to alter the column `total` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - Added the required column `brand` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exp_month` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exp_year` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last4` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `state` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "exp_month" INTEGER NOT NULL,
ADD COLUMN     "exp_year" INTEGER NOT NULL,
ADD COLUMN     "last4" TEXT NOT NULL,
ALTER COLUMN "total" SET DATA TYPE INTEGER,
DROP COLUMN "state",
ADD COLUMN     "state" TEXT NOT NULL;

-- DropEnum
DROP TYPE "OrderState";
