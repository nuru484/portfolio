-- CreateEnum
CREATE TYPE "CertificateStatus" AS ENUM ('VALID', 'REVOKED');

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "certificateId" VARCHAR(60) NOT NULL,
    "recipientName" VARCHAR(200) NOT NULL,
    "programme" VARCHAR(200) NOT NULL,
    "description" VARCHAR(2000) NOT NULL,
    "issuer" VARCHAR(200) NOT NULL,
    "partner" VARCHAR(200),
    "projectName" VARCHAR(200),
    "location" VARCHAR(200),
    "periodStart" DATE,
    "periodEnd" DATE,
    "issueDate" DATE NOT NULL,
    "signatoryName" VARCHAR(200) NOT NULL,
    "signatoryTitle" VARCHAR(200) NOT NULL,
    "status" "CertificateStatus" NOT NULL DEFAULT 'VALID',
    "revokedReason" VARCHAR(500),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_certificateId_key" ON "Certificate"("certificateId");

-- CreateIndex
CREATE INDEX "Certificate_certificateId_idx" ON "Certificate"("certificateId");

-- CreateIndex
CREATE INDEX "Certificate_status_idx" ON "Certificate"("status");

-- CreateIndex
CREATE INDEX "Certificate_deletedAt_idx" ON "Certificate"("deletedAt");
