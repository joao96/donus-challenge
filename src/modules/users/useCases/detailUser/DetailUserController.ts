import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DetailUserUseCase } from './DetailUserUseCase';

class DetailUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;
    const detailUserUseCase = container.resolve(DetailUserUseCase);

    const user = await detailUserUseCase.execute(cpf);

    return response.status(200).json(user);
  }
}

export { DetailUserController };
