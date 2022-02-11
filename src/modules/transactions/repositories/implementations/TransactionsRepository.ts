import { PrismaClient, Transaction } from '@prisma/client';

import { prismaClient } from '../../../../services/prisma';
import { ICreateTransactionDTO } from '../../dtos/ICreateTransactionDTO';
import { ITransactionsRepository } from '../ITransactionsRepository';

class TransactionsRepository implements ITransactionsRepository {
  private client: PrismaClient;

  constructor() {
    this.client = prismaClient;
  }

  async findById(id: string): Promise<Transaction> {
    const result = await this.client.transaction.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create({
    amount,
    recipient_id,
    type,
    description,
    sender_id,
  }: ICreateTransactionDTO): Promise<Transaction> {
    const result = await this.client.transaction.create({
      data: {
        amount,
        type,
        description,
        recipient_id,
        sender_id,
      },
    });

    return result;
  }
}

export { TransactionsRepository };
