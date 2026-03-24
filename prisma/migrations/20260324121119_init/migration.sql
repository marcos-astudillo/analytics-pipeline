-- CreateTable
CREATE TABLE "RawEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "props" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RawEvent_eventId_idx" ON "RawEvent"("eventId");

-- CreateIndex
CREATE INDEX "RawEvent_type_idx" ON "RawEvent"("type");

-- CreateIndex
CREATE INDEX "RawEvent_timestamp_idx" ON "RawEvent"("timestamp");
