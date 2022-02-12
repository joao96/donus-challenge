import { Transaction } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ITransactionsRepository } from '../../repositories/ITransactionsRepository';

@injectable()
class ListTransactionByAccountUseCase {
  constructor(
    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionsRepository,
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(account_id: string): Promise<Transaction[]> {
    const account = await this.accountsRepository.findById(account_id);

    if (!account) {
      throw new AppError('Account not found.');
    }

    try {
      const transactions = await this.transactionsRepository.listAllByAccount(
        account_id
      );
      return transactions;
    } catch (err) {
      throw new AppError('Internal Error while retrieving transactions.', 500);
    }
  }
}

export { ListTransactionByAccountUseCase };
