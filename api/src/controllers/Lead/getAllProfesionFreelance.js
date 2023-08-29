// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener todas las profesiones únicas de los leads de un freelancer específico
const getAllProfessionFreelance = async (email) => {
  // Utiliza el método 'distinct' para obtener todas las profesiones únicas
  // de los registros de la colección 'Lead' que cumplen las condiciones especificadas
  const professions = await Lead.distinct("profesion", {
    checked: true,
    view: true,
    vendedor: email,
    status: "Sin contactar",
  });

  return professions; // Devuelve un array con las profesiones únicas encontradas
};

module.exports = getAllProfessionFreelance;
