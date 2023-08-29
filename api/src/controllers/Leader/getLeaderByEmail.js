// Importar el modelo Leader desde la ubicación correcta
const Leader = require("../../models/Leader");

// Definir una función asincrónica llamada getLeaderByEmail que buscará un registro de Leader por su dirección de correo electrónico
const getLeaderByEmail = async (email) => {
  // Utilizar el método "findOne" del modelo Leader para encontrar un registro con el correo electrónico proporcionado
  const leader = await Leader.findOne({ email: email });

  // Retornar el registro encontrado (puede ser un objeto o null si no se encuentra ningún registro con ese correo electrónico)
  return leader;
};

// Exportar la función getLeaderByEmail para que esté disponible en otros módulos
module.exports = getLeaderByEmail;
