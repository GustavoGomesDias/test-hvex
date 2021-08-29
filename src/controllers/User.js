import ErrorHandle from '../errors/ErrorHandle.js';
import bcrypt from '../services/auth/bcrypt.js';
import UserModel from '../models/User.js'

class UserController {
  async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id, 'name userName update_login');
      return res.status(200).json(user);
    } catch (err) {
      const errorHandle = ErrorHandle.badRequestError(err);
      res.status(errorHandle.status).json(errorHandle.errors);
    }
  }

  async crateUser(req, res) {
    try {
      const { name, userName, password } = req.body;

      const hash = await bcrypt.encrypt(password.toString());
      const user = new UserModel({ name, userName, password: hash });
      await user.save();

      return res.status(200).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      const errorHandle = ErrorHandle.badRequestError(err);
      res.status(errorHandle.status).json(errorHandle.errors);
    }
  }

  async updateUser(res, req) {
    try {
      const { id, name, userName } = req.body;

      await UserModel.findByIdAndUpdate(id, {
        $set: {
          name,
          userName,
        }
      }, {
        runValidators: true,
      });

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      const errorHandle = ErrorHandle.badRequestError(err);
      res.status(errorHandle.status).json(errorHandle.errors);
    }
  }
}

export default UserController;
