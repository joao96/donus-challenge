import 'reflect-metadata';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUserCase';
import { AccountsRepository } from '../../repositories/implementations/AccountsRepository';
import { CreateAccountUseCase } from './CreateAccountUseCase';

let accountsRepository: AccountsRepository;
let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;

describe('Create Account', () => {
  beforeAll(() => {
    config({ path: '.env.test' });
  });

  beforeEach(async () => {
    usersRepository = new UsersRepository();
    accountsRepository = new AccountsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    createAccountUseCase = new CreateAccountUseCase(
      accountsRepository,
      usersRepository
    );
  });

  afterAll(async () => {
    await prismaClient.account.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to create a new account', async () => {
    const user = await createUserUseCase.execute({
      cpf: '44444',
      full_name: 'Esther Newman',
    });

    const response = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    expect(response).toHaveProperty('id');
  });

  it('should not be able to create a new account with a non existing user', async () => {
    await expect(
      createAccountUseCase.execute({
        user_cpf: '0',
      })
    ).rejects.toEqual(new AppError('User not found.'));
  });

  it('should not be able to create a second account', async () => {
    const user = await createUserUseCase.execute({
      cpf: '54654',
      full_name: 'Nettie Robbins',
    });

    await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    await expect(
      createAccountUseCase.execute({
        user_cpf: user.cpf,
      })
    ).rejects.toEqual(new AppError('User already has an account.'));
  });
});
