import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {
  encrypt: async (password) => {
    try {
      const salt = await bcrypt.genSalt(8);

      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  compare: async (inputPassword, hash) => {
    try {
      return await bcrypt.compare(inputPassword, hash);
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  generateToken: (id, userName) => {
    const token = jwt.sign({ id, userName }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return token;
  },

  verifyToken: (token) => {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    return user;
  },
};
