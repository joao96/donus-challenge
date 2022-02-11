import { Router } from 'express';

import { accountsRoutes } from './accounts.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/accounts', accountsRoutes);

export { router };
