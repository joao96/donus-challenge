import { User } from '@prisma/client';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  findByCPF(cpf: string): Promise<User>;
  create(user: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
