import 'reflect-metadata';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { CreateUserUseCase } from './CreateUserUserCase';

let usersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User', () => {
  beforeAll(() => {
    config({ path: '.env.test' });
    usersRepository = new UsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to create a new user', async () => {
    const response = await createUserUseCase.execute({
      cpf: '123456',
      full_name: 'Chase Baldwin',
    });

    expect(response).toHaveProperty('created_at');
  });

  it('should not be able to create a user that already exists', async () => {
    await expect(
      createUserUseCase.execute({
        cpf: '123456',
        full_name: 'Chase Baldwin',
      })
    ).rejects.toEqual(new AppError('User already exists.'));
  });

  it('should not be able to create a user without full_name', async () => {
    await expect(
      createUserUseCase.execute({
        cpf: '1234567',
        full_name: null,
      })
    ).rejects.toEqual(new AppError("Provide the user's full name."));
  });

  it('should not be able to create a user without cpf', async () => {
    await expect(
      createUserUseCase.execute({
        cpf: null,
        full_name: 'Lloyd Simon',
      })
    ).rejects.toEqual(new AppError('Provide a valid CPF.'));
  });
});
