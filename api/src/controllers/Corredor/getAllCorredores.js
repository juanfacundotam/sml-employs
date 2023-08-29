// Importar el modelo de datos del corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para obtener todos los corredores
const getAllCorredores = async () => {
  // Consultar todos los corredores en la base de datos usando el modelo Corredor
  const corredor = await Corredor.find();

  // Devolver el resultado de la consulta (todos los corredores)
  return corredor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getAllCorredores;
