-- CreateTable
CREATE TABLE "ClientLogo" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "logo" VARCHAR(500) NOT NULL,
    "websiteUrl" VARCHAR(500),
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ClientLogo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClientLogo_isPublished_idx" ON "ClientLogo"("isPublished");

-- CreateIndex
CREATE INDEX "ClientLogo_displayOrder_idx" ON "ClientLogo"("displayOrder");

-- CreateIndex
CREATE INDEX "ClientLogo_deletedAt_idx" ON "ClientLogo"("deletedAt");
