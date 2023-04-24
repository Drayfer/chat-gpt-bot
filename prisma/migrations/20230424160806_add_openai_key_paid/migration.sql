-- AlterTable
ALTER TABLE "Settings" ADD COLUMN     "openaiKeyPaid" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "paid" SET DEFAULT NULL;
