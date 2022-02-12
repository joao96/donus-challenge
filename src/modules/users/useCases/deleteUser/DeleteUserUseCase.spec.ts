import 'reflect-metadata';
import { config } from 'dotenv';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { UsersRepository } from '../../repositories/implementations/UsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUserCase';
import { DeleteUserUseCase } from './DeleteUserUseCase';

let usersRepository: UsersRepository;
let deleteUserUseCase: DeleteUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Delete User', () => {
  beforeAll(async () => {
    config({ path: '.env.test' });
    usersRepository = new UsersRepository();
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);

    await createUserUseCase.execute({
      cpf: '22222',
      full_name: 'Jean Hayes',
    });
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.$disconnect();
  });

  it('should be able to delete a user', async () => {
    const response = await deleteUserUseCase.execute('22222');

    expect(response).toEqual('User successfully deleted.');
  });

  it('should not be able to delete a non existing user', async () => {
    await expect(deleteUserUseCase.execute('0')).rejects.toEqual(
      new AppError('User not found.')
    );
  });
});
