// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para obtener un cliente por su email
const getClientByEmail = async (email) => {
  // Buscamos un cliente en la base de datos que coincida con el email proporcionado
  const client = await Clientes.findOne({ email });

  return client; // Devolvemos el cliente encontrado (puede ser null si no se encuentra ningún cliente con ese email)
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = getClientByEmail;
