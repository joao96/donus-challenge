import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class DetailUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(cpf: string): Promise<User> {
    const user = await this.usersRepository.findByCPF(cpf);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export { DetailUserUseCase };
