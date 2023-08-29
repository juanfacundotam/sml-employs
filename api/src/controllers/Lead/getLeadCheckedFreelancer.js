// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads verificados que son freelancers y no tienen ciertos estados
const getLeadCheckedFreelancer = async () => {
  // Busca todos los registros de lead en la colección 'Lead' que cumplen ciertas condiciones
  const leadChequed = await Lead.find({
    // Campo "checked" debe ser igual a true (verificados)
    freelancer: true, // Campo "freelancer" debe ser igual a true (freelancers)
    status: {
      // Campo "status" no debe ser ninguno de los siguientes valores:
      $nin: ["incidencia", "discard", "discard_bot"],
    },
  });

  return leadChequed; // Devuelve un array con los leads que cumplen con las condiciones
};

module.exports = getLeadCheckedFreelancer;
