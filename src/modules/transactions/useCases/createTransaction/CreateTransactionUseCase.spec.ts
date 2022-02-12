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
import { CreateTransactionUseCase } from './CreateTransactionUseCase';

let usersRepository: UsersRepository;
let accountsRepository: AccountsRepository;
let transactionsRepository: TransactionsRepository;

let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let createTransactionUseCase: CreateTransactionUseCase;

describe('Create Transaction', () => {
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
  });

  afterAll(async () => {
    await prismaClient.transaction.deleteMany();
    await prismaClient.account.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to create a new transaction', async () => {
    const user = await createUserUseCase.execute({
      cpf: '77777',
      full_name: 'Marian Huff',
    });

    const account = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    const response = await createTransactionUseCase.execute({
      amount: 10,
      recipient_id: account.id,
      type: TransactionType.DEPOSIT,
    });

    expect(response).toHaveProperty('id');
  });

  it('should not be able to create a new transaction with invalid amount', async () => {
    const user = await createUserUseCase.execute({
      cpf: '88888',
      full_name: 'Frances Wilkins',
    });

    const account = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    await expect(
      createTransactionUseCase.execute({
        amount: -1,
        recipient_id: account.id,
        type: TransactionType.DEPOSIT,
      })
    ).rejects.toEqual(new AppError('Invalid amount value.'));
  });

  it('should not be able to create a new transaction without recipient_id', async () => {
    await expect(
      createTransactionUseCase.execute({
        amount: 10,
        recipient_id: '0',
        type: TransactionType.DEPOSIT,
      })
    ).rejects.toEqual(new AppError('Recipient account not found.'));
  });

  it('should not be able to create a new DEPOSIT transaction with amount > 2000', async () => {
    const user = await createUserUseCase.execute({
      cpf: '414141',
      full_name: 'Irene Evans',
    });

    const account = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    await expect(
      createTransactionUseCase.execute({
        amount: 3000,
        recipient_id: account.id,
        type: TransactionType.DEPOSIT,
      })
    ).rejects.toEqual(new AppError('Exceeded the maximum deposit amount.'));
  });

  it('should not be able to create a new TRANSFER transaction with invalid sender_id', async () => {
    const user = await createUserUseCase.execute({
      cpf: '99999',
      full_name: 'Catherine Delgado',
    });

    const account = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    await expect(
      createTransactionUseCase.execute({
        amount: 10,
        recipient_id: account.id,
        type: TransactionType.TRANSFER,
        sender_id: '0',
      })
    ).rejects.toEqual(new AppError('Sender account not found.'));
  });

  it('should not be able to create a new TRANSFER transaction with insufficient funds', async () => {
    const user1 = await createUserUseCase.execute({
      cpf: '11111',
      full_name: 'Lucas Wallace',
    });

    const account1 = await createAccountUseCase.execute({
      user_cpf: user1.cpf,
    });

    const user2 = await createUserUseCase.execute({
      cpf: '22222',
      full_name: 'Warren Perry',
    });

    const account2 = await createAccountUseCase.execute({
      user_cpf: user2.cpf,
    });

    await expect(
      createTransactionUseCase.execute({
        amount: 10,
        recipient_id: account1.id,
        type: TransactionType.TRANSFER,
        sender_id: account2.id,
      })
    ).rejects.toEqual(new AppError('Not enough funds.'));
  });

  it('should be able to create a new TRANSFER transaction', async () => {
    const user1 = await createUserUseCase.execute({
      cpf: '121212',
      full_name: 'Lloyd Barton',
    });

    const account1 = await createAccountUseCase.execute({
      user_cpf: user1.cpf,
    });

    const user2 = await createUserUseCase.execute({
      cpf: '131313',
      full_name: 'Timothy White',
    });

    const account2 = await createAccountUseCase.execute({
      user_cpf: user2.cpf,
    });

    await createTransactionUseCase.execute({
      amount: 10,
      recipient_id: account1.id,
      type: TransactionType.DEPOSIT,
    });

    const response = await createTransactionUseCase.execute({
      amount: 10,
      sender_id: account1.id,
      recipient_id: account2.id,
      type: TransactionType.TRANSFER,
    });

    expect(response).toHaveProperty('id');
  });
});
