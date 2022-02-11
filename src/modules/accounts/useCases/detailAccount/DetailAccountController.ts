import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DetailAccountUseCase } from './DetailAccountUseCase';

class DetailAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const detailAccountUseCase = container.resolve(DetailAccountUseCase);

    const account = await detailAccountUseCase.execute(id);

    return response.status(200).json(account);
  }
}

export { DetailAccountController };
