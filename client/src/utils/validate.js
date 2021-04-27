import emailRegEx from './emailRegex';

const validate = input => {
  let errors = {};

  for (let field in input) {
    switch (field) {
      case 'firstName':
        if (!input[field]) {
          errors = {
            ...errors,
            firstName: 'El campo nombre es requerido'
          }
        }
        break;
      case 'lastName':
        if (!input[field]) {
          errors = {
            ...errors,
            lastName: 'El campo apellido es requerido'
          }
        }
        break;
      case 'email':
        if (!input[field]) {
          errors = {
            ...errors,
            email: 'El campo email es requerido'
          }
        } else if (!emailRegEx.test(input[field])) {
          errors = {
            ...errors,
            email: 'Se debe ingresar un email válido'
          }
        }
        break;
      case 'password':
        if (!input[field]) {
          errors = {
            ...errors,
            password: 'La contraseña es requerida'
          }
        }
        break;
      case 'rePassword':
        if (input[field] !== input.password) {
          errors = {
            ...errors,
            rePassword: 'La contraseña no coincide con la ingresada'
          }
        }
        break;
      default:
        break;
    }
  }
  return errors;
}

export default validate;