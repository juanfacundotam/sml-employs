// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");

// Función asincrónica para actualizar la información de un Vendedor por su dirección de correo electrónico
const updateVendedorByEmail = async (email, updatedData) => {
  // Buscar el Vendedor en la base de datos por su dirección de correo electrónico y actualizarlo con los nuevos datos
  // El objeto "updatedData" contiene los campos y valores que se deben actualizar en el Vendedor
  // El parámetro { new: true } devuelve el Vendedor actualizado en lugar del Vendedor original
  const vendedor = await Vendedor.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });

  // Devolver el Vendedor actualizado que contiene la información actualizada
  return vendedor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = updateVendedorByEmail;
