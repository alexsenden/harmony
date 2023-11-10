-- CreateTable
CREATE TABLE "poll_vote" (
    "poll_option_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "poll_vote_pkey" PRIMARY KEY ("user_id","poll_option_id")
);

-- AddForeignKey
ALTER TABLE "poll_vote" ADD CONSTRAINT "poll_vote_poll_option_id_fkey" FOREIGN KEY ("poll_option_id") REFERENCES "poll_option"("poll_option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poll_vote" ADD CONSTRAINT "poll_vote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
