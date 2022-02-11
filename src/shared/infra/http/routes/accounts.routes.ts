import { Router } from 'express';

import { CreateAccountController } from '../../../../modules/accounts/useCases/createAccount/CreateAccountController';
import { DeleteAccountController } from '../../../../modules/accounts/useCases/deleteAccount/DeleteAccountController';
import { DetailAccountController } from '../../../../modules/accounts/useCases/detailAccount/DetailAccountController';

const accountsRoutes = Router();

const createAccountController = new CreateAccountController();
const deleteAccountController = new DeleteAccountController();
const detailAccountController = new DetailAccountController();

accountsRoutes.post('/', createAccountController.handle);
accountsRoutes.get('/:id', detailAccountController.handle);
accountsRoutes.delete('/:id', deleteAccountController.handle);

export { accountsRoutes };
