import { Account } from '@prisma/client';

import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';

interface IAccountsRepository {
  findByCPF(user_cpf: string): Promise<Account>;
  findById(id: string): Promise<Account>;
  create(account: ICreateAccountDTO): Promise<Account>;
  delete(user_cpf: string): Promise<void>;
}

export { IAccountsRepository };
