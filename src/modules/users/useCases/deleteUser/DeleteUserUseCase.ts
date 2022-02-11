import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(cpf: string): Promise<void> {
    await this.usersRepository.delete(cpf);
  }
}

export { DeleteUserUseCase };
