-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "duration" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Video_userId_idx" ON "Video"("userId");

-- CreateIndex
CREATE INDEX "Video_status_idx" ON "Video"("status");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
