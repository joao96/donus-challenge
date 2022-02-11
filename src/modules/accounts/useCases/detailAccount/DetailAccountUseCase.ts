import { Account } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';

@injectable()
class DetailAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(id: string): Promise<Account> {
    let account = await this.accountsRepository.findById(id);
    if (!account) {
      account = await this.accountsRepository.findByCPF(id);
      if (!account) {
        throw new AppError('Account not found.');
      }
    }

    return account;
  }
}

export { DetailAccountUseCase };
