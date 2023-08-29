// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para actualizar el perfil de un cliente en la base de datos
const updateClientProfile = async (email, body) => {
  // Buscamos al cliente por su email y actualizamos sus campos con los valores proporcionados en el objeto "body"
  // Utilizamos { new: true } para que se devuelva el cliente actualizado después de realizar la actualización
  const client = await Clientes.findOneAndUpdate({ email }, body, {
    new: true,
  });

  return client; // Devolvemos el cliente actualizado con los cambios realizados
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = updateClientProfile;
