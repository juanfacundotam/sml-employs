// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para establecer un cliente como referido por otro cliente en la base de datos
const setReferred = async ({ email, referred }) => {
  // Buscamos al cliente que se quiere establecer como referido (referred) en la base de datos
  // Luego, agregamos el email del cliente que lo refiere (email) al array "referred" del cliente referido (referred)
  // Utilizamos $addToSet para asegurarnos de que el email del cliente referido no se duplique en el array
  // Y establecemos { new: true } para que se devuelva el cliente actualizado después de realizar la actualización
  const referido = await Clientes.findOneAndUpdate(
    { email: referred },
    { $addToSet: { referred: email } },
    { new: true }
  );

  return referido; // Devolvemos el cliente referido actualizado con la nueva referencia
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = setReferred;
