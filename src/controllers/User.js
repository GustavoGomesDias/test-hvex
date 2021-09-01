import ErrorHandle from '../errors/ErrorHandler.js';
import auth from '../services/auth/auth.js';
import UserModel from '../models/User.js';
import validations from '../validations/validations.js';

class UserController {
  async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id, 'name userName update_login');

      if (user === null) {
        const errorHandle = ErrorHandle.notFoundError(user);
        return res.status(errorHandle.status).json(errorHandle.errors);
      }

      return res.status(200).json(user);
    } catch (err) {
      const errorHandle = ErrorHandle.notFoundError(err);
      return res.status(errorHandle.status).json(errorHandle.errors);
    }
  }

  async crateUser(req, res) {
    try {
      const { name, userName, password } = req.body;

      const hash = await auth.encrypt(password.toString());
      const user = new UserModel({ name, userName, password: hash });
      await user.save();

      return res.status(200).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      const errorHandle = ErrorHandle.badRequestError(err);
      return res.status(errorHandle.status).json(errorHandle.errors);
    }
  }

  async updateUser(req, res) {
    try {
      const { name, userName } = req.body;

      if (validations.validationField(req.userId)) {
        const errorHandle = ErrorHandle.notFoundError(null);
        return res.status(errorHandle.status).json(errorHandle.errors);
      }

      await UserModel.findByIdAndUpdate(req.userId, {
        $set: {
          name,
          userName,
        },
      });

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      const errorHandle = ErrorHandle.notFoundError(err);
      return res.status(errorHandle.status).json(errorHandle.errors);
    }
  }

  async deleteUser(req, res) {
    try {
      if (validations.validationField(req.userId)) {
        const errorHandle = ErrorHandle.notFoundError(null);
        return res.status(errorHandle.status).json(errorHandle.errors);
      }

      await UserModel.findByIdAndDelete(req.userId);

      return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (err) {
      const errorHandle = ErrorHandle.notFoundError(err);
      return res.status(errorHandle.status).json(errorHandle.errors);
    }
  }
}

export default UserController;
