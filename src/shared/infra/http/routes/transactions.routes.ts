import { Router } from 'express';

import { CreateTransactionController } from '../../../../modules/transactions/useCases/createTransaction/CreateTransactionController';

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
// const detailTransactionsController = new DetailTransactionsController();

transactionsRoutes.post('/', createTransactionController.handle);
// transactionsRoutes.get('/:id', detailTransactionsController.handle);

export { transactionsRoutes };
