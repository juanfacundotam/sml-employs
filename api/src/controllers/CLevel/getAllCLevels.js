// Importar el modelo CLevel desde la ubicación correcta
const CLevel = require("../../models/CLevel");

// Definir una función asincrónica llamada getAllCLevels que obtendrá todos los registros de CLevel
const getAllCLevels = async () => {
  // Utilizar el método "find" del modelo CLevel para obtener todos los registros de la base de datos
  const cLevels = await CLevel.find();

  // Retornar los registros obtenidos
  return cLevels;
};

// Exportar la función getAllCLevels para que esté disponible en otros módulos
module.exports = getAllCLevels;
