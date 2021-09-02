/* eslint-disable import/first */
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import swaggerUI from 'swagger-ui-express';

import UserModel from './models/User.js';
import UserRoute from './routes/User.js';
import TokenRoute from './routes/Token.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/hvex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const swaggerDoc = JSON.parse(fs.readFileSync(new URL('./swagger.json', import.meta.url)));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use('/', UserRoute);
app.use('/', TokenRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
