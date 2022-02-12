import 'reflect-metadata';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUserCase';
import { DetailUserUseCase } from './DetailUserUseCase';

let usersRepository: UsersRepository;
let detailUserUseCase: DetailUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Detail User', () => {
  beforeAll(async () => {
    config({ path: '.env.test' });
    usersRepository = new UsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    detailUserUseCase = new DetailUserUseCase(usersRepository);
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to retrieve user info', async () => {
    await createUserUseCase.execute({
      cpf: '33333',
      full_name: 'Benjamin Gilbert',
    });

    const response = await detailUserUseCase.execute('33333');

    expect(response).toHaveProperty('created_at');
  });

  it('should not be able to retrieve info from a non existing user', async () => {
    await expect(detailUserUseCase.execute('0')).rejects.toEqual(
      new AppError('User not found.')
    );
  });
});
