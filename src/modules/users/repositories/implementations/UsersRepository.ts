import { PrismaClient, User } from '@prisma/client';

import { AppError } from '../../../../errors/AppError';
import { prismaClient } from '../../../../services/prisma';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private client: PrismaClient;

  constructor() {
    this.client = prismaClient;
  }
  async findByCPF(cpf: string): Promise<User> {
    const result = await this.client.user.findUnique({
      where: {
        cpf,
      },
      include: {
        Account: true,
      },
    });

    return result;
  }

  async create({ cpf, full_name }: ICreateUserDTO): Promise<User> {
    const result = await this.client.user.create({
      data: {
        cpf,
        full_name,
      },
    });

    return result;
  }

  async delete(cpf: string): Promise<string> {
    try {
      await this.client.user.delete({
        where: {
          cpf,
        },
      });
    } catch (err) {
      throw new AppError('User not found.');
    }

    return 'User successfully deleted.';
  }
}

export { UsersRepository };
