/*
  Warnings:

  - The primary key for the `PollOption` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `poll_option_id` to the `PollOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PollOption" DROP CONSTRAINT "PollOption_pkey",
ADD COLUMN     "poll_option_id" TEXT NOT NULL,
ADD CONSTRAINT "PollOption_pkey" PRIMARY KEY ("poll_option_id");
