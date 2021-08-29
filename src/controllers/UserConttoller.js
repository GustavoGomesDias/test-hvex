import mongoose from 'mongoose';

import UserModel from '../models/User.js';
import crypt from '../cryptor/bcrypt.js';

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
      console.log(err);
      if (err.nome = 'Validation Error') {
        return res.status(400).json(err);
      }
      return res.status(500).json({ erro: 'Erro de servidor, tente novamente mais tarde.' });
    }
  }

  async crateUser(req, res) {
    try {
      const { name, userName, password } = req.body;

      const hash = await crypt.encrypt(password);
      const user = new this.User({ name, userName, password: hash });
      await user.save();

      return res.status(200).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).json(err);
      }
      return res.status(500).json({ erro: 'Erro de servidor, tente novamente mais tarde.' });
    }
  }
}

export default new UserController();
