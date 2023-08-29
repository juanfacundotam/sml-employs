const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword = /\d/;
const regexUppercase = /[A-Z]/;

export function validate(userData) {
  const errors = {};

  if (userData.username === '') {
    errors.username = 'Por favor, complete este campo';
  }
  if (userData.username.length > 0 && !regexEmail.test(userData.username)) {
    (`El email ${userData.username} esta mal`);
    errors.username = 'El campo debe ser un email';
  }else{
    (`El email ${userData.username} esta bien`);
  }
  if (userData.username.length > 35) {
    errors.username = 'El nombre es demasiado Largo';
  }
  if (!regexPassword.test(userData.password)) {
    errors.password = 'La contraseña debe incluir un número';
  }
  if (!regexUppercase.test(userData.password)) {
    errors.password = 'La contraseña debe incluir al menos una letra en mayúscula';
  }
  if (userData.password.length > 0 && userData.password.length < 6) {
    errors.password = 'La contraseña es muy corta';
  }
  if (userData.password.length > 10) {
    errors.password = 'La contraseña es muy larga';
  }
  if (userData.password === '') {
    errors.password = 'Se requiere una contraseña';
  }

  // Verificación de usuario y contraseña establecidos
  const hardcodedUsername = 'usuario@example.com';
  const hardcodedPassword = 'A123456';

  if (userData.username !== hardcodedUsername || userData.password !== hardcodedPassword) {
    errors.auth = 'Credenciales incorrectas';
  }

  return errors;
}