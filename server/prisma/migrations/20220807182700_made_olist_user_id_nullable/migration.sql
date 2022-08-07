-- DropForeignKey
ALTER TABLE "QList" DROP CONSTRAINT "QList_userId_fkey";

-- AlterTable
ALTER TABLE "QList" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "QList" ADD CONSTRAINT "QList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
