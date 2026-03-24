-- CreateTable
CREATE TABLE "AggDailyMetrics" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "AggDailyMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AggDailyMetrics_date_type_key" ON "AggDailyMetrics"("date", "type");
