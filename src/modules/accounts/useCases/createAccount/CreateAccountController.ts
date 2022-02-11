import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAccountUseCase } from './CreateAccountUseCase';

class CreateAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_cpf } = request.body;
    const createAccountUseCase = container.resolve(CreateAccountUseCase);

    const account = await createAccountUseCase.execute({
      user_cpf,
    });

    return response.status(201).json(account);
  }
}

export { CreateAccountController };
