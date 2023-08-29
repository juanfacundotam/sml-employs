// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener todas las profesiones únicas de los leads no verificados
const getAllProfession = async () => {
  // Utiliza el método 'distinct' para obtener todas las profesiones únicas
  // de los registros de la colección 'Lead' donde el campo 'checked' es 'false'
  const professions = await Lead.distinct("profesion", { checked: false });

  return professions; // Devuelve un array con las profesiones únicas encontradas
};

module.exports = getAllProfession;
