// Importar el modelo Leader desde la ubicación correcta
const Leader = require("../../models/Leader");

// Definir una función asincrónica llamada getLeaderByName que buscará registros de Leader por nombre
const getLeaderByName = async (name) => {
  // Crear una expresión regular (regex) para realizar una búsqueda insensible a mayúsculas y minúsculas del nombre proporcionado
  const regex = new RegExp(name, "i");

  // Utilizar el método "find" del modelo Leader para buscar registros que coincidan con el nombre proporcionado mediante la expresión regular
  const leader = await Leader.find({ name: { $regex: regex } });

  // Retornar los registros de líderes encontrados (puede ser un array vacío si no se encuentran coincidencias)
  return leader;
};

// Exportar la función getLeaderByName para que esté disponible en otros módulos
module.exports = getLeaderByName;
