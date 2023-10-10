/*
  Warnings:

  - You are about to drop the `Discussion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `post_type` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('DISCUSSION', 'POLL', 'REVIEW');

-- DropForeignKey
ALTER TABLE "Discussion" DROP CONSTRAINT "Discussion_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_post_id_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "post_type" "PostType" NOT NULL,
ADD COLUMN     "rating" DECIMAL(65,30);

-- DropTable
DROP TABLE "Discussion";

-- DropTable
DROP TABLE "Review";
