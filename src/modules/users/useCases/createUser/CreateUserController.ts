import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUserCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf, full_name } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      cpf,
      full_name,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
