import { Router } from 'express';

import UserController from '../controllers/UserConttoller.js';

const route = Router();

route.get('/', UserController.findById);
route.post('/', UserController.crateUser);

export default route;
