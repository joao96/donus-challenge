import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';

@injectable()
class DeleteAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(id: string): Promise<string> {
    const accountExists = await this.accountsRepository.findById(id);

    if (!accountExists) {
      throw new AppError('Account not found.');
    }

    const response = await this.accountsRepository.delete(id);

    return response;
  }
}

export { DeleteAccountUseCase };
