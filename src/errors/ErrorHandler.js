/* eslint-disable class-methods-use-this */
import mongoose from 'mongoose';

class ErrorHandler {
  getErrors(err) {
    const errors = err.message.replace('users validation failed: ', '').split(',');
    const objErrors = { };
    const nameError = errors.filter((error) => error.includes('name'));
    const userNameError = errors.filter((error) => error.includes('userName'));
    const passwordError = errors.filter((error) => error.includes('password'));

    // substr aqui está removendo o espaço

    if (nameError.length > 0) objErrors.name = nameError[0].split(':')[1].substring(1);
    if (userNameError.length > 0) objErrors.userName = userNameError[0].split(':')[1].substring(1);
    if (passwordError.length > 0) objErrors.password = passwordError[0].split(':')[1].substring(1);

    return objErrors;
  }

  badRequestError(err) {
    if (err instanceof mongoose.Error.ValidationError) {
      const errors = this.getErrors(err);
      return { status: 400, errors: { errors: { ...errors } } };
    }
    console.log(err);
    return { status: 500, msg: { error: 'Error interno. Tente novamente mais tarde.' } };
  }

  notFoundError(err) {
    if (err instanceof mongoose.Error.CastError || err === null) {
      return { status: 400, errors: { errors: 'Usuário não existe.' } };
    }
    console.log(err);
    return { status: 500, msg: { error: 'Error interno. Tente novamente mais tarde.' } };
  }
}

export default new ErrorHandler();
