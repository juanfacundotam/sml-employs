// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para actualizar el estado de un lead del Corredor a "checked"
const putCorredorLeadChecked = async (email, leadChecked) => {
  try {
    // Buscar el Corredor en la base de datos por su dirección de correo electrónico y el ID del lead a actualizar
    // Utilizando arrayFilters para identificar el elemento del arreglo "leads" que debe ser actualizado
    // La operación $set actualiza el campo "checked" del lead específico a true
    // El parámetro { new: true } devuelve el Corredor actualizado en lugar del Corredor original
    const corredor = await Corredor.findOneAndUpdate(
      { email, "leads._id": leadChecked.id },
      { $set: { "leads.$[leadId].checked": true } },
      { new: true, arrayFilters: [{ "leadId._id": leadChecked.id }] }
    );

    // Devolver el Corredor actualizado que contiene la información del lead actualizado a "checked"
    return corredor;
  } catch (error) {
    // Si ocurre un error durante la actualización del Corredor, mostrarlo en la consola y propagar el error
    console.error("Error al actualizar información del lead:", error);
    throw error;
  }
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = putCorredorLeadChecked;
