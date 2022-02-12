import 'reflect-metadata';
import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Response, Request } from 'express';

import './shared/container';

import 'express-async-errors';

import { AppError } from './errors/AppError';
import { router } from './shared/infra/http/routes';

config({ path: '.env' });
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
