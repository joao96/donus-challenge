import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(cpf: string): Promise<string> {
    const user = await this.usersRepository.findByCPF(cpf);

    if (!user) {
      throw new AppError('User not found.');
    }

    const response = await this.usersRepository.delete(cpf);

    return response;
  }
}

export { DeleteUserUseCase };
