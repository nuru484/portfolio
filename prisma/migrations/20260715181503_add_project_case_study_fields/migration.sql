-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "outcome" TEXT,
ADD COLUMN     "overview" TEXT,
ADD COLUMN     "problem" TEXT,
ADD COLUMN     "screenshots" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "youtubeUrl" VARCHAR(500);
