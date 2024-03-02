-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('PENDING', 'ERROR', 'COMPLETE');

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "status" "ArticleStatus" NOT NULL DEFAULT 'PENDING';
