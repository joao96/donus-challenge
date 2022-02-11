import { container } from 'tsyringe';

import { IAccountsRepository } from '../../modules/accounts/repositories/IAccountsRepository';
import { AccountsRepository } from '../../modules/accounts/repositories/implementations/AccountsRepository';
import { TransactionsRepository } from '../../modules/transactions/repositories/implementations/TransactionsRepository';
import { ITransactionsRepository } from '../../modules/transactions/repositories/ITransactionsRepository';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IAccountsRepository>(
  'AccountsRepository',
  AccountsRepository
);

container.registerSingleton<ITransactionsRepository>(
  'TransactionsRepository',
  TransactionsRepository
);
