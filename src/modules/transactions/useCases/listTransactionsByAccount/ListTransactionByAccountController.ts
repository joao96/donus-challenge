import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListTransactionByAccountUseCase } from './ListTransactionByAccountUseCase';

class ListTransactionByAccountController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listTransactionByAccountUseCase = container.resolve(
      ListTransactionByAccountUseCase
    );

    const transactions = await listTransactionByAccountUseCase.execute(id);

    return response.status(200).json(transactions);
  }
}

export { ListTransactionByAccountController };
