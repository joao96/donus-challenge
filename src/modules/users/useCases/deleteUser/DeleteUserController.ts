import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteUserUseCase } from './DeleteUserUseCase';

class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cpf } = request.params;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);

    const message = await deleteUserUseCase.execute(cpf);

    return response.status(200).json({
      message,
    });
  }
}

export { DeleteUserController };
