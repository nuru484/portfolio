-- Replace the separate desktop/mobile project images with a single image.
-- Existing desktop images are preserved as the new image.
ALTER TABLE "Project" ADD COLUMN "image" VARCHAR(500);

UPDATE "Project" SET "image" = "desktopImage";

ALTER TABLE "Project" ALTER COLUMN "image" SET NOT NULL;

ALTER TABLE "Project" DROP COLUMN "desktopImage";
ALTER TABLE "Project" DROP COLUMN "mobileImage";
