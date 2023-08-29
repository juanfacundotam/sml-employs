// Importar el modelo CLevel desde la ubicación correcta
const CLevel = require("../../models/CLevel");

// Definir una función asincrónica llamada getCLevelByName que buscará registros de CLevel por nombre
const getCLevelByName = async (Name) => {
  // Crear una expresión regular (regex) para realizar una búsqueda insensible a mayúsculas y minúsculas del nombre proporcionado
  const regex = new RegExp(Name, "i");

  // Utilizar el método "find" del modelo CLevel para buscar registros que coincidan con el nombre proporcionado mediante la expresión regular
  const cLevels = await CLevel.find({ Name: { $regex: regex } });

  // Retornar los registros encontrados (puede ser un array vacío si no se encuentran coincidencias)
  return cLevels;
};

// Exportar la función getCLevelByName para que esté disponible en otros módulos
module.exports = getCLevelByName;
