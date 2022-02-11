import { User } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ cpf, full_name }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByCPF(cpf);

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const user = await this.usersRepository.create({ cpf, full_name });

    return user;
  }
}

export { CreateUserUseCase };
