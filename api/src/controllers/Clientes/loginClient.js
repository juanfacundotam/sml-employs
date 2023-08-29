// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para realizar el inicio de sesión de un cliente por su nombre de usuario (username)
const loginClient = async (username) => {
  // Buscamos un cliente en la base de datos que coincida con el nombre de usuario (username) proporcionado
  const client = await Clientes.findOne({ username });

  return client; // Devolvemos el cliente encontrado (puede ser null si no se encuentra ningún cliente con ese nombre de usuario)
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = loginClient;
