import { inject, injectable } from 'tsyringe';

import { IAccountsRepository } from '../../repositories/IAccountsRepository';

@injectable()
class DeleteAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.accountsRepository.delete(id);
  }
}

export { DeleteAccountUseCase };
