import 'reflect-metadata';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUserCase';
import { AccountsRepository } from '../../repositories/implementations/AccountsRepository';
import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { DetailAccountUseCase } from './DetailAccountUseCase';

let accountsRepository: AccountsRepository;
let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let detailAccountUseCase: DetailAccountUseCase;

describe('Detail Account', () => {
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
    detailAccountUseCase = new DetailAccountUseCase(accountsRepository);
  });

  afterAll(async () => {
    await prismaClient.account.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to retrieve account info by ID', async () => {
    const user = await createUserUseCase.execute({
      cpf: '66666',
      full_name: 'Julia Lowe',
    });

    const account = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    const response = await detailAccountUseCase.execute(account.id);

    expect(response).toHaveProperty('id');
  });

  it('should be able to retrieve account info by CPF', async () => {
    const response = await detailAccountUseCase.execute('66666');

    expect(response).toHaveProperty('id');
  });

  it('should not be able to retrieve info of non existing account', async () => {
    await expect(detailAccountUseCase.execute('0')).rejects.toEqual(
      new AppError('Account not found.')
    );
  });
});
