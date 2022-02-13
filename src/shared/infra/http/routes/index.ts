import { Router } from 'express';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { accountsRoutes } from './accounts.routes';
import { transactionsRoutes } from './transactions.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(ensureAuthenticated);
router.use('/users', usersRoutes);
router.use('/accounts', accountsRoutes);
router.use('/transactions', transactionsRoutes);

export { router };
