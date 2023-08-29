// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");

// Función asincrónica para obtener un vendedor por su ID
const getVendedorById = async (id) => {
  // Buscar un vendedor en la base de datos por su ID
  const vendedor = await Vendedor.findById(id);

  // Devolver el resultado de la consulta (el vendedor encontrado o null si no se encontró)
  return vendedor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getVendedorById;
