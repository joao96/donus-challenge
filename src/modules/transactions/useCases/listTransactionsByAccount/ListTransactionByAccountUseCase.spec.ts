import 'reflect-metadata';
import { TransactionType } from '@prisma/client';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { AccountsRepository } from '../../../accounts/repositories/implementations/AccountsRepository';
import { CreateAccountUseCase } from '../../../accounts/useCases/createAccount/CreateAccountUseCase';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUserCase';
import { TransactionsRepository } from '../../repositories/implementations/TransactionsRepository';
import { CreateTransactionUseCase } from '../createTransaction/CreateTransactionUseCase';
import { ListTransactionByAccountUseCase } from './ListTransactionByAccountUseCase';

let usersRepository: UsersRepository;
let accountsRepository: AccountsRepository;
let transactionsRepository: TransactionsRepository;

let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let createTransactionUseCase: CreateTransactionUseCase;
let listTransactionByAccountUseCase: ListTransactionByAccountUseCase;

describe('List Transactions by Account ID', () => {
  beforeAll(() => {
    config({ path: '.env.test' });
  });

  beforeEach(async () => {
    usersRepository = new UsersRepository();
    accountsRepository = new AccountsRepository();
    transactionsRepository = new TransactionsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    createAccountUseCase = new CreateAccountUseCase(
      accountsRepository,
      usersRepository
    );
    createTransactionUseCase = new CreateTransactionUseCase(
      transactionsRepository,
      accountsRepository
    );
    listTransactionByAccountUseCase = new ListTransactionByAccountUseCase(
      transactionsRepository,
      accountsRepository
    );
  });

  afterAll(async () => {
    await prismaClient.transaction.deleteMany();
    await prismaClient.account.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to list all transactions for a given account ID', async () => {
    const user1 = await createUserUseCase.execute({
      cpf: '9312312',
      full_name: 'Juan Farmer',
    });

    const account1 = await createAccountUseCase.execute({
      user_cpf: user1.cpf,
    });

    const user2 = await createUserUseCase.execute({
      cpf: '6542432',
      full_name: 'Douglas Gomez',
    });

    const account2 = await createAccountUseCase.execute({
      user_cpf: user2.cpf,
    });

    await createTransactionUseCase.execute({
      amount: 10,
      recipient_id: account1.id,
      type: TransactionType.DEPOSIT,
    });

    await createTransactionUseCase.execute({
      amount: 10,
      sender_id: account1.id,
      recipient_id: account2.id,
      type: TransactionType.TRANSFER,
    });

    await expect(
      (async () => {
        return listTransactionByAccountUseCase.execute(account1.id);
      })()
    ).resolves.toHaveLength(2);
  });

  it('should not be able to list transactions for a non existing account', async () => {
    await expect(
      listTransactionByAccountUseCase.execute('not a valid ID')
    ).rejects.toEqual(new AppError('Account not found.'));
  });
});
