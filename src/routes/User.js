import { Router } from 'express';

import UserController from '../controllers/User.js';
import loginHandler from '../middleware/loginHandler.js';

const route = Router();

const userController = new UserController();

route.get('/:id', userController.findById);
route.post('/', userController.crateUser);
route.put('/', loginHandler, userController.updateUser);
route.delete('/', loginHandler, userController.deleteUser);

export default route;
