import { Router } from 'express';

import TokenController from '../controllers/TokenController.js';

const route = Router();

route.post('/login', TokenController.authenticate);

export default route;
