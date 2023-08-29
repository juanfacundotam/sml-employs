// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para obtener todas las categorías únicas de los clientes potenciales (leads) que no han sido verificados (checked: false)
const getAllCategory = async () => {
  // Utilizar el método distinct de Mongoose para obtener todas las categorías únicas
  // de los clientes potenciales que no han sido verificados (checked: false)
  const categories = await Lead.distinct("category", { checked: false });

  // Devolver el arreglo con las categorías únicas encontradas
  return categories;
};

// Exportar la función 'getAllCategory' para su uso externo
module.exports = getAllCategory;
