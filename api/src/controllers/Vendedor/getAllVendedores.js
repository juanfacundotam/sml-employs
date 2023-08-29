// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");

// Función asincrónica para obtener todos los vendedores
const getAllVendedores = async () => {
  try {
    // Consultar todos los vendedores en la base de datos utilizando el modelo Vendedor
    const vendedores = await Vendedor.find();

    // Devolver el resultado de la consulta (todos los vendedores)
    return vendedores;
  } catch (error) {
    // Si ocurre un error durante la consulta, lanzar un error con un mensaje descriptivo
    throw new Error("No se pudieron obtener los vendedores");
  }
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getAllVendedores;
