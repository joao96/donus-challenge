import { TransactionType } from '@prisma/client';

interface ICreateTransactionDTO {
  recipient_id: string;
  sender_id?: string;
  amount: number;
  description?: string;
  type: TransactionType;
}

export { ICreateTransactionDTO };
