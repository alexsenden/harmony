/*
  Warnings:

  - You are about to drop the column `artistArtistId` on the `artist_credit` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "artist_credit" DROP CONSTRAINT "artist_credit_artistArtistId_fkey";

-- AlterTable
ALTER TABLE "artist_credit" DROP COLUMN "artistArtistId";
