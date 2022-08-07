-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "isSolved" BOOLEAN NOT NULL DEFAULT false,
    "allListId" TEXT,
    "todoListId" TEXT,
    "favoriteListId" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_allListId_fkey" FOREIGN KEY ("allListId") REFERENCES "QList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_todoListId_fkey" FOREIGN KEY ("todoListId") REFERENCES "QList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_favoriteListId_fkey" FOREIGN KEY ("favoriteListId") REFERENCES "QList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
