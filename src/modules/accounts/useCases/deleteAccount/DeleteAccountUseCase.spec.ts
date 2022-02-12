import 'reflect-metadata';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { UsersRepository } from '../../../users/repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUserCase';
import { AccountsRepository } from '../../repositories/implementations/AccountsRepository';
import { CreateAccountUseCase } from '../createAccount/CreateAccountUseCase';
import { DeleteAccountUseCase } from './DeleteAccountUseCase';

let accountsRepository: AccountsRepository;
let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;
let createAccountUseCase: CreateAccountUseCase;
let deleteAccountUseCase: DeleteAccountUseCase;

describe('Delete Account', () => {
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
    deleteAccountUseCase = new DeleteAccountUseCase(accountsRepository);
  });

  afterAll(async () => {
    await prismaClient.account.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to delete an account', async () => {
    const user = await createUserUseCase.execute({
      cpf: '55555',
      full_name: 'Glenn Wade',
    });

    const account = await createAccountUseCase.execute({
      user_cpf: user.cpf,
    });

    const response = await deleteAccountUseCase.execute(account.id);

    expect(response).toEqual('Account successfully deleted.');
  });

  it('should not be able to delete a non existing account', async () => {
    await expect(deleteAccountUseCase.execute('0')).rejects.toEqual(
      new AppError('Account not found.')
    );
  });
});
