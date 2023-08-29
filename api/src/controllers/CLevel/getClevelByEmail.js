// Importar el modelo CLevel desde la ubicación correcta
const CLevel = require("../../models/CLevel");

// Definir una función asincrónica llamada getClevelByEmail que buscará un registro de CLevel por correo electrónico
const getClevelByEmail = async (email) => {
  // Utilizar el método "findOne" del modelo CLevel para encontrar un registro con el correo electrónico proporcionado
  const clevel = await CLevel.findOne({ email: email });

  // Retornar el registro encontrado (puede ser un objeto o null si no se encuentra ningún registro)
  return clevel;
};

// Exportar la función getClevelByEmail para que esté disponible en otros módulos
module.exports = getClevelByEmail;
