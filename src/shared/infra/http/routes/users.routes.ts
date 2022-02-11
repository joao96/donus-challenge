import { Router } from 'express';

import { CreateUserController } from '../../../../modules/users/useCases/createUser/CreateUserController';
import { DeleteUserController } from '../../../../modules/users/useCases/deleteUser/DeleteUserController';
import { DetailUserController } from '../../../../modules/users/useCases/detailUser/DetailUserController';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const detailUserController = new DetailUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.get('/:cpf', detailUserController.handle);
usersRoutes.delete('/:cpf', deleteUserController.handle);

export { usersRoutes };
