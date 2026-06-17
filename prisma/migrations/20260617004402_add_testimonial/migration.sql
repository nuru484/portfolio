-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "author" VARCHAR(150) NOT NULL,
    "role" VARCHAR(200) NOT NULL,
    "quote" VARCHAR(2000) NOT NULL,
    "image" VARCHAR(500),
    "socials" JSONB NOT NULL DEFAULT '[]',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Testimonial_isPublished_idx" ON "Testimonial"("isPublished");

-- CreateIndex
CREATE INDEX "Testimonial_displayOrder_idx" ON "Testimonial"("displayOrder");

-- CreateIndex
CREATE INDEX "Testimonial_deletedAt_idx" ON "Testimonial"("deletedAt");
