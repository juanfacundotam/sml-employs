// Importar el modelo Leader desde la ubicación correcta
const Leader = require("../../models/Leader");

// Definir una función asincrónica llamada getAllLeaders que obtendrá todos los registros de Leader
const getAllLeaders = async () => {
  // Utilizar el método "find" del modelo Leader para obtener todos los registros de líderes de la base de datos
  const leaders = await Leader.find();

  // Retornar los registros de líderes obtenidos (puede ser un array vacío si no hay líderes en la base de datos)
  return leaders;
};

// Exportar la función getAllLeaders para que esté disponible en otros módulos
module.exports = getAllLeaders;
