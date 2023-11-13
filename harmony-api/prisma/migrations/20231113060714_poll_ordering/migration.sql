/*
  Warnings:

  - Added the required column `entry_number` to the `poll_option` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "poll_option" ADD COLUMN     "entry_number" INTEGER NOT NULL;
