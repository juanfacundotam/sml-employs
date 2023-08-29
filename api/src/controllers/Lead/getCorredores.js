// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener todos los nombres únicos de corredores (agents) en la base de datos
const getCorredores = async () => {
  // Utiliza el método 'distinct' para obtener todos los nombres únicos de corredores
  // de los registros de la colección 'Lead' donde el campo 'freelancer' es igual a 'false'
  const corredores = await Lead.distinct("corredor_name", {
    freelancer: false,
  });

  return corredores; // Devuelve un array con los nombres únicos de los corredores encontrados
};

module.exports = getCorredores;
