import mongoose from 'mongoose';

import ErrorHandle from '../errors/ErrorHandle.js';
import UserModel from '../models/User.js';
import bcrypt from '../services/auth/bcrypt.js';

class UserController {
  constructor() {
    this.User = mongoose.model('User', UserModel);
  }

  async findById(req, res) {
    try {
      const { id } = req.body;
      const user = await this.User.findById(id, 'name userName update_login');
      return res.status(200).json(user);
    } catch (err) {
      const errorHandle = ErrorHandle.badRequestErro(err);
      res.status(errorHandle.status).json(errorHandle.error);
    }
  }

  async crateUser(req, res) {
    try {
      const { name, userName, password } = req.body;

      const hash = await bcrypt.encrypt(password);
      const user = new this.User({ name, userName, password: hash });
      await user.save();

      return res.status(200).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      const errorHandle = ErrorHandle.badRequestErro(err);
      res.status(errorHandle.status).json(errorHandle.error);
    }
  }
}

export default new UserController();
