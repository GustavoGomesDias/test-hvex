/* eslint-disable no-unused-vars */
import express from 'express';
import mongoose from 'mongoose';

import UserModel from './models/User.js'
import UserRoute from './routes/User.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/hvex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', UserRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`[server]: Server is running at ${port}`);
});
