// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para obtener todos los clientes
const getAllClientes = async () => {
  // Buscamos todos los clientes en la base de datos utilizando el modelo "Clientes"
  const clientes = await Clientes.find();

  return clientes; // Devolvemos la lista de clientes encontrados
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = getAllClientes;
