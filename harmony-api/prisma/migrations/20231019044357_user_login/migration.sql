-- CreateTable
CREATE TABLE "user_cookie" (
    "cookie" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),

    CONSTRAINT "user_cookie_pkey" PRIMARY KEY ("cookie")
);

-- AddForeignKey
ALTER TABLE "user_cookie" ADD CONSTRAINT "user_cookie_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
