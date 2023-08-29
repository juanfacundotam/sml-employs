// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para actualizar los leads de un Corredor por su dirección de correo electrónico
const updateLeadsCorredorByEmail = async (email, newLeads) => {
  // Buscar el Corredor en la base de datos por su dirección de correo electrónico
  const corredor = await Corredor.findOne({ email });

  // Verificar si el Corredor existe
  if (!corredor) {
    // Si el Corredor no se encuentra, lanzar un error con un mensaje descriptivo
    throw new Error("Corredor no encontrado");
  }

  // Actualizar los leads del Corredor con los nuevos leads proporcionados
  corredor.leads = newLeads;

  // Guardar los cambios realizados en el Corredor en la base de datos
  const updatedCorredor = await corredor.save();

  // Devolver el Corredor actualizado que contiene los nuevos leads
  return updatedCorredor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = updateLeadsCorredorByEmail;
