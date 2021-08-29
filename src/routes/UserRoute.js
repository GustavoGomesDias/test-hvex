import { Router } from 'express';

import UserController from '../controllers/UserConttoller.js';

const route = Router();

route.post('/', UserController.crateUser);
