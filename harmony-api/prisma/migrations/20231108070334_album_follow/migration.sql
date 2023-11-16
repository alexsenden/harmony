-- CreateTable
CREATE TABLE "follow_album" (
    "following_id" TEXT NOT NULL,
    "follower_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_album_pkey" PRIMARY KEY ("following_id","follower_id")
);

-- AddForeignKey
ALTER TABLE "follow_album" ADD CONSTRAINT "follow_album_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_album" ADD CONSTRAINT "follow_album_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "album"("album_id") ON DELETE RESTRICT ON UPDATE CASCADE;
