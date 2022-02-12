import 'reflect-metadata';
import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import './shared/container';

import { AppError } from './errors/AppError';
import { router } from './shared/infra/http/routes';
import swaggerFile from './swagger.json';

config({ path: '.env' });
const app = express();

app.use(express.json());
app.use(cors());

app.use(router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
