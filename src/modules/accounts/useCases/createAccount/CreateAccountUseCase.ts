import { Account } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';
import { ICreateAccountDTO } from '../../dtos/ICreateAccountDTO';
import { IAccountsRepository } from '../../repositories/IAccountsRepository';

@injectable()
class CreateAccountUseCase {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_cpf }: ICreateAccountDTO): Promise<Account> {
    const userAlreadyExists = await this.usersRepository.findByCPF(user_cpf);

    if (userAlreadyExists) {
      const accountAlreadyExists = await this.accountsRepository.findByCPF(
        user_cpf
      );

      if (accountAlreadyExists) {
        throw new AppError('User already has an account.');
      }

      const account = await this.accountsRepository.create({ user_cpf });

      return account;
    }

    throw new AppError('User not found.');
  }
}

export { CreateAccountUseCase };
