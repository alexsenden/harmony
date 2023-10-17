/*
  Warnings:

  - You are about to drop the `Album` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PollOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Publish` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AlbumToArtist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_following_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_user_id_fkey";

-- DropForeignKey
ALTER TABLE "PollOption" DROP CONSTRAINT "PollOption_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_album_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_song_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Publish" DROP CONSTRAINT "Publish_album_id_fkey";

-- DropForeignKey
ALTER TABLE "Publish" DROP CONSTRAINT "Publish_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_album_id_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToArtist" DROP CONSTRAINT "_AlbumToArtist_A_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToArtist" DROP CONSTRAINT "_AlbumToArtist_B_fkey";

-- DropTable
DROP TABLE "Album";

-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Follow";

-- DropTable
DROP TABLE "Like";

-- DropTable
DROP TABLE "PollOption";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Publish";

-- DropTable
DROP TABLE "Song";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_AlbumToArtist";

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "post" (
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "post_type" "PostType" NOT NULL,
    "content" TEXT,
    "rating" DECIMAL(65,30),
    "song_id" INTEGER,
    "album_id" INTEGER,
    "artist_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "poll_option" (
    "post_id" TEXT NOT NULL,
    "option" TEXT NOT NULL,

    CONSTRAINT "poll_option_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "follow" (
    "following_id" TEXT NOT NULL,
    "follower_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("following_id","follower_id")
);

-- CreateTable
CREATE TABLE "like" (
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("user_id","post_id")
);

-- CreateTable
CREATE TABLE "comment" (
    "comment_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("comment_id")
);

-- CreateTable
CREATE TABLE "artist" (
    "artist_id" INTEGER NOT NULL,
    "artist_name" TEXT NOT NULL,
    "begin_date_year" INTEGER,
    "end_date_year" INTEGER,
    "comment" TEXT,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "artist_alias" (
    "artist_id" INTEGER NOT NULL,
    "artist_alias" TEXT NOT NULL,

    CONSTRAINT "artist_alias_pkey" PRIMARY KEY ("artist_id","artist_alias")
);

-- CreateTable
CREATE TABLE "artist_credit_relation" (
    "artist_credit_id" INTEGER NOT NULL,
    "artist_id" INTEGER NOT NULL,

    CONSTRAINT "artist_credit_relation_pkey" PRIMARY KEY ("artist_credit_id","artist_id")
);

-- CreateTable
CREATE TABLE "artist_credit" (
    "artist_credit_id" INTEGER NOT NULL,
    "formatted_name" TEXT NOT NULL,
    "artistArtistId" INTEGER,

    CONSTRAINT "artist_credit_pkey" PRIMARY KEY ("artist_credit_id")
);

-- CreateTable
CREATE TABLE "album" (
    "album_id" INTEGER NOT NULL,
    "album_name" TEXT NOT NULL,
    "comment" TEXT,
    "release_group_type" TEXT,
    "artist_credit_id" INTEGER NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "song" (
    "song_id" INTEGER NOT NULL,
    "artist_credit_id" INTEGER NOT NULL,
    "song_name" TEXT NOT NULL,
    "length" INTEGER,
    "comment" TEXT,

    CONSTRAINT "song_pkey" PRIMARY KEY ("song_id")
);

-- CreateTable
CREATE TABLE "track" (
    "album_id" INTEGER NOT NULL,
    "song_id" INTEGER NOT NULL,
    "position" INTEGER,

    CONSTRAINT "track_pkey" PRIMARY KEY ("album_id","song_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "song"("song_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("album_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poll_option" ADD CONSTRAINT "poll_option_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_alias" ADD CONSTRAINT "artist_alias_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_credit_relation" ADD CONSTRAINT "artist_credit_relation_artist_credit_id_fkey" FOREIGN KEY ("artist_credit_id") REFERENCES "artist_credit"("artist_credit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_credit_relation" ADD CONSTRAINT "artist_credit_relation_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "artist_credit" ADD CONSTRAINT "artist_credit_artistArtistId_fkey" FOREIGN KEY ("artistArtistId") REFERENCES "artist"("artist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artist_credit_id_fkey" FOREIGN KEY ("artist_credit_id") REFERENCES "artist_credit"("artist_credit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "song" ADD CONSTRAINT "song_artist_credit_id_fkey" FOREIGN KEY ("artist_credit_id") REFERENCES "artist_credit"("artist_credit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "album"("album_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_song_id_fkey" FOREIGN KEY ("song_id") REFERENCES "song"("song_id") ON DELETE RESTRICT ON UPDATE CASCADE;
