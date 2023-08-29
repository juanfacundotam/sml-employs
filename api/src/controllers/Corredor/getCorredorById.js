// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para obtener un Corredor por su ID
const getCorredorById = async (id) => {
  // Buscar un Corredor en la base de datos por su ID
  const corredor = await Corredor.findById(id);

  // Devolver el resultado de la consulta (el Corredor encontrado o null si no se encontró)
  return corredor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getCorredorById;
