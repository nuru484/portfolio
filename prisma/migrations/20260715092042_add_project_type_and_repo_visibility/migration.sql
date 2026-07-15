-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('CLIENT', 'SIDE');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isRepoPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "projectType" "ProjectType" NOT NULL DEFAULT 'SIDE';

-- CreateIndex
CREATE INDEX "Project_projectType_idx" ON "Project"("projectType");
