import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../../../errors/AppError';

export async function ensureAuthenticated(
  request: Request,

  response: Response,

  next: NextFunction
) {
  const apiKey = request.header('x-api-key');
  if (!apiKey) {
    throw new AppError('API Key missing!', 401);
  }

  if (apiKey !== process.env.API_KEY) {
    throw new AppError('Invalid API Key!', 401);
  } else {
    next();
  }
}
