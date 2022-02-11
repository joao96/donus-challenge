import { PrismaClient, Account } from '@prisma/client';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { ICreateAccountDTO } from '../../dtos/ICreateAccountDTO';
import { IMakeTransactionDTO } from '../../dtos/IMakeTransactionDTO';
import { IAccountsRepository } from '../IAccountsRepository';

class AccountsRepository implements IAccountsRepository {
  private client: PrismaClient;

  constructor() {
    this.client = prismaClient;
  }

  async deposit({ amount, id }: IMakeTransactionDTO): Promise<Account> {
    const account = await this.client.account.update({
      where: {
        id,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return account;
  }

  async withdrawal({ amount, id }: IMakeTransactionDTO): Promise<Account> {
    const account = await this.client.account.update({
      where: {
        id,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    return account;
  }

  async findByCPF(user_cpf: string): Promise<Account> {
    const result = await this.client.account.findUnique({
      where: {
        user_cpf,
      },
    });

    return result;
  }

  async findById(id: string): Promise<Account> {
    const result = await this.client.account.findUnique({
      where: {
        id,
      },
    });

    return result;
  }

  async create({ user_cpf }: ICreateAccountDTO): Promise<Account> {
    const result = await this.client.account.create({
      data: {
        balance: 0,
        user_cpf,
      },
    });

    return result;
  }

  async delete(id: string): Promise<void> {
    try {
      await this.client.account.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new AppError('Account not found.');
    }
  }
}

export { AccountsRepository };
