// Importar el modelo Leader desde la ubicación correcta
const Leader = require("../../models/Leader");

// Definir una función asincrónica llamada getLeaderById que buscará un registro de Leader por su ID
const getLeaderById = async (id) => {
  // Utilizar el método "findById" del modelo Leader para buscar un registro por su ID
  const leader = await Leader.findById(id);

  // Retornar el registro encontrado (puede ser un objeto o null si no se encuentra ningún registro con ese ID)
  return leader;
};

// Exportar la función getLeaderById para que esté disponible en otros módulos
module.exports = getLeaderById;
