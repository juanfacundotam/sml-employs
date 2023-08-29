// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para obtener todos los países únicos de los clientes potenciales (leads) que no han sido verificados (checked: false)
const getAllCountry = async () => {
  // Utilizar el método distinct de Mongoose para obtener todos los países únicos
  // de los clientes potenciales que no han sido verificados (checked: false)
  const countries = await Lead.distinct("country", { checked: false });

  // Devolver el arreglo con los países únicos encontrados
  return countries;
};

// Exportar la función 'getAllCountry' para su uso externo
module.exports = getAllCountry;
