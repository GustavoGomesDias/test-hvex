import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome requerido.'],
  },

  userName: {
    type: String,
    required: [true, 'Nomde de usuário requerido.'],
  },

  password: {
    type: String,
    required: [true, 'Senha requerida.'],
    min: [6, 'Senha deve ter pelo menos 6 caracteres.'],
  },
});

export default UserSchema;
