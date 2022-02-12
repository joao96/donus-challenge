import { Account } from '@prisma/client';

import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';
import { IMakeTransactionDTO } from '../dtos/IMakeTransactionDTO';

interface IAccountsRepository {
  findByCPF(user_cpf: string): Promise<Account>;
  findById(id: string): Promise<Account>;
  create(account: ICreateAccountDTO): Promise<Account>;
  deposit(transaction: IMakeTransactionDTO): Promise<Account>;
  withdrawal(transaction: IMakeTransactionDTO): Promise<Account>;
  delete(user_cpf: string): Promise<string>;
}

export { IAccountsRepository };
