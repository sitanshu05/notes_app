-- CreateTable
CREATE TABLE "StarredNotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "noteId" INTEGER NOT NULL,

    CONSTRAINT "StarredNotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StarredNotes" ADD CONSTRAINT "StarredNotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StarredNotes" ADD CONSTRAINT "StarredNotes_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
