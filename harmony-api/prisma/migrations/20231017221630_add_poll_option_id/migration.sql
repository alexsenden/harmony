/*
  Warnings:

  - The primary key for the `poll_option` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `poll_option_id` was added to the `poll_option` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "poll_option" DROP CONSTRAINT "poll_option_pkey",
ADD COLUMN     "poll_option_id" TEXT NOT NULL,
ADD CONSTRAINT "poll_option_pkey" PRIMARY KEY ("poll_option_id");
