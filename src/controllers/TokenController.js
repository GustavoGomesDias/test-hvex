/* eslint-disable no-underscore-dangle */
import UserModel from '../models/User.js';
import auth from '../services/auth/auth.js';
import ErrorHandler from '../errors/ErrorHandler.js';

class TokenController {
  async authenticate(req, res) {
    try {
      const { userName, password } = req.body;

      const user = await UserModel.findOne({ userName });
      const compare = await auth.compare(password, user.password);
      if (!compare) {
        const errors = ErrorHandler.unauthorizedError(false);

        return res.status(errors.status).json(errors.errors);
      }

      await UserModel.findByIdAndUpdate(user._id, {
        $set: {
          update_login: new Date(),
        },
      });

      const token = auth.generateToken(user._id, user.userName);

      return res.status(200).json({ token });
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}

export default new TokenController();
