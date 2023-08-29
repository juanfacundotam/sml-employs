// Importar el modelo de Leader desde la ubicación apropiada del archivo.
const Leader = require("../../models/Leader");

// Función para actualizar un líder por su correo electrónico.
// Parámetros:
// - email: El correo electrónico del líder que se actualizará.
// - updatedData: Un objeto que contiene los datos actualizados para el líder.
const updateLeaderByEmail = async (email, updatedData) => {
  // Buscar al líder con el correo electrónico dado y actualizar sus datos con los datos proporcionados en updatedData.
  // La opción { new: true } devuelve el documento actualizado como resultado de la operación.
  const leader = await Leader.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });

  // Devolver el objeto del líder actualizado al llamador.
  return leader;
};

// Exportar la función updateLeaderByEmail para que sea accesible desde otros módulos.
module.exports = updateLeaderByEmail;
