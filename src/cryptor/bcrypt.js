import bcrypt from 'bcrypt';

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
};
