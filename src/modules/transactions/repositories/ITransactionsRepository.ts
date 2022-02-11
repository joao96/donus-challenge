import { Transaction } from '@prisma/client';

import { ICreateTransactionDTO } from '../dtos/ICreateTransactionDTO';

interface ITransactionsRepository {
  findById(id: string): Promise<Transaction>;
  create(transaction: ICreateTransactionDTO): Promise<Transaction>;
}

export { ITransactionsRepository };
