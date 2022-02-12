import { Router } from 'express';

import { CreateTransactionController } from '../../../../modules/transactions/useCases/createTransaction/CreateTransactionController';
import { ListTransactionByAccountController } from '../../../../modules/transactions/useCases/listTransactionsByAccount/ListTransactionByAccountController';

const transactionsRoutes = Router();

const createTransactionController = new CreateTransactionController();
const listTransactionByAccountController =
  new ListTransactionByAccountController();

transactionsRoutes.post('/', createTransactionController.handle);
transactionsRoutes.get('/:id', listTransactionByAccountController.handle);

export { transactionsRoutes };
