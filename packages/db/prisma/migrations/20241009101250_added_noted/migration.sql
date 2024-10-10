-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);
