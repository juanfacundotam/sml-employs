// Importar el modelo CLevel desde la ubicación correcta
const Promociones = require("../../models/Promociones");

// Definir una función asincrónica llamada getAllCLevels que obtendrá todos los registros de CLevel
const getAllPromociones = async () => {
  // Utilizar el método "find" del modelo CLevel para obtener todos los registros de la base de datos
  const promociones = await Promociones.find();

  // Retornar los registros obtenidos
  return promociones;
};

// Exportar la función getAllCLevels para que esté disponible en otros módulos
module.exports = getAllPromociones;
