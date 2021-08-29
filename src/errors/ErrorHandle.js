import mongoose from 'mongoose';

export default {
  badRequestErro: (err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      return { status: 400, error: error.message };
    }
    console.log(err);
    return { status: 500, error: 'Error interno. Tente novamente mais tarde.' };
  },
}
