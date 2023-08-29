// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para actualizar la información de un Corredor por su ID
const updateCorredorById = async (id, updatedData) => {
  // Buscar el Corredor en la base de datos por su ID y actualizarlo con los nuevos datos
  // El objeto "updatedData" contiene los campos y valores que se deben actualizar en el Corredor
  // El parámetro { new: true } devuelve el Corredor actualizado en lugar del Corredor original
  const corredor = await Corredor.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // Devolver el Corredor actualizado que contiene la información actualizada
  return corredor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = updateCorredorById;