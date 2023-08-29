// Importar el modelo CLevel desde la ubicación correcta
const CLevel = require("../../models/CLevel");

// Definir una función asincrónica llamada getCLevelById que buscará un registro de CLevel por su ID
const getCLevelById = async (id) => {
  // Utilizar el método "findById" del modelo CLevel para buscar un registro por su ID
  const cLevel = await CLevel.findById(id);

  // Retornar el registro encontrado (puede ser un objeto o null si no se encuentra ningún registro con ese ID)
  return cLevel;
};

// Exportar la función getCLevelById para que esté disponible en otros módulos
module.exports = getCLevelById;
