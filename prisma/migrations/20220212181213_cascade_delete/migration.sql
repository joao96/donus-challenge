-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_user_cpf_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_recipient_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_sender_id_fkey";

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_cpf_fkey" FOREIGN KEY ("user_cpf") REFERENCES "User"("cpf") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
