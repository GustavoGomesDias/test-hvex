import { Router } from 'express';

import UserController from '../controllers/User.js';

const route = Router();

const userController = new UserController();

route.get('/:id', userController.findById);
route.post('/', userController.crateUser);
route.put('/', userController.updateUser);

export default route;
