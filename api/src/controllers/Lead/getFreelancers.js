// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener todos los nombres únicos de corredores (agents) que son freelancers en la base de datos
const getFreelancers = async () => {
  // Utiliza el método 'distinct' para obtener todos los nombres únicos de corredores
  // de los registros de la colección 'Lead' donde el campo 'freelancer' es igual a 'true'
  const corredores = await Lead.distinct("corredor_name", {
    freelancer: true,
  });

  return corredores; // Devuelve un array con los nombres únicos de los corredores (agents) freelancers encontrados
};

module.exports = getFreelancers;
