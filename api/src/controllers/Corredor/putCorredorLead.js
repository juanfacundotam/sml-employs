// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para actualizar el Corredor con información de un nuevo lead no chequeado
const putCorredorLead = async (email, leadUnchecked10) => {
  try {
    // Buscar el Corredor en la base de datos por su dirección de correo electrónico y actualizarlo
    // Utilizando la operación $push para agregar el nuevo lead no chequeado al arreglo "leads" del Corredor
    // El parámetro { new: true } devuelve el Corredor actualizado en lugar del Corredor original
    const corredor = await Corredor.findOneAndUpdate(
      { email },
      { $push: { leads: leadUnchecked10 } },
      { new: true }
    );

    // Devolver el Corredor actualizado que contiene la información del nuevo lead no chequeado
    return corredor;
  } catch (error) {
    // Si ocurre un error durante la actualización del Corredor, mostrarlo en la consola y propagar el error
    console.error("Error al agregar información del lead:", error);
    throw error;
  }
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = putCorredorLead;
