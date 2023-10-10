/*
  Warnings:

  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `artist_id` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "Publish" DROP CONSTRAINT "Publish_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_artist_id_fkey";

-- DropForeignKey
ALTER TABLE "_AlbumToArtist" DROP CONSTRAINT "_AlbumToArtist_B_fkey";

-- AlterTable
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_pkey",
DROP COLUMN "user_id",
ADD COLUMN     "artist_id" TEXT NOT NULL,
ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("artist_id");

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Publish" ADD CONSTRAINT "Publish_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AlbumToArtist" ADD CONSTRAINT "_AlbumToArtist_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist"("artist_id") ON DELETE CASCADE ON UPDATE CASCADE;
