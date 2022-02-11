import { TransactionType } from '@prisma/client';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionUseCase } from './CreateTransactionUseCase';

class CreateTransactionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount, recipient_id, description, sender_id } = request.body;
    const type: TransactionType = TransactionType.DEPOSIT;

    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase
    );

    const transaction = await createTransactionUseCase.execute({
      amount,
      recipient_id,
      type,
      description,
      sender_id,
    });

    return response.status(201).json(transaction);
  }
}

export { CreateTransactionController };
