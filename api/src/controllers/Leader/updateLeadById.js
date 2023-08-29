// Importar el modelo Leader desde la ubicación correcta
const Leader = require("../../models/Leader");

// Definir una función asincrónica llamada updateLeaderById que actualizará un registro de Leader por su ID
const updateLeaderById = async (id, updatedData) => {
  // Utilizar el método "findByIdAndUpdate" del modelo Leader para buscar un registro por su ID y actualizarlo con los datos proporcionados
  // El primer argumento es el ID del registro que se desea actualizar
  // updatedData es un objeto que contiene los campos y valores que se deben actualizar en el registro encontrado
  // El tercer argumento { new: true } devuelve el registro actualizado en lugar del registro anterior a la actualización
  const leader = await Leader.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  // Retornar el registro de líder actualizado
  return leader;
};

// Exportar la función updateLeaderById para que esté disponible en otros módulos
module.exports = updateLeaderById;
