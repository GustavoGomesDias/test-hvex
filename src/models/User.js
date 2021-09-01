import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome requerido.'],
  },

  userName: {
    type: String,
    required: [true, 'Nomde de usuário requerido.'],
    unique: [true, 'Nome de usuário já existente.'],
  },

  password: {
    type: String,
    required: [true, 'Senha requerida.'],
    min: [6, 'Senha deve ter pelo menos 6 caracteres.'],
  },

  update_login: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.path('userName').validate(
  async (userName) => {
    // Se existir, retorna 1
    const userNameCount = await mongoose.model('users').countDocuments({ userName });

    // !1 === false
    return !userNameCount;
  }, 'Nome de usuário já existente.',
);

export default mongoose.model('users', UserSchema);
