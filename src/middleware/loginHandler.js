/* eslint-disable no-unused-vars */
import UserModel from '../models/User.js';
import ErrorHandler from '../errors/ErrorHandler.js';
import auth from '../services/auth/auth.js';

export default async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      const error = ErrorHandler.unauthorizedError(false);
      return res.status(error.status).json(error.errors);
    }

    const [, token] = authorization.split(' ');

    const { id, userName } = auth.verifyToken(token);

    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      const errors = ErrorHandler.notFoundError(null);
      return res.status(errors.status).json(errors.errors);
    }

    req.userId = id;
    req.userName = userName;
    req.name = user.name;
    return next();
  } catch (err) {
    console.log(err);
    const error = ErrorHandler.unauthorizedError(false);
    return res.status(error.status).json(error.errors);
  }
};
