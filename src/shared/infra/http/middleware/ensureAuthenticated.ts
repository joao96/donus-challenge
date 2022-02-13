import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../../../errors/AppError';

export async function ensureAuthenticated(
  request: Request,

  response: Response,

  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('API Key missing!', 401);
  }

  const [, apiKey] = authHeader.split(' ');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new AppError('Invalid API Key!', 401);
  } else {
    next();
  }
}
