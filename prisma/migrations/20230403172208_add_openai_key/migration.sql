-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "openaiKey" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
