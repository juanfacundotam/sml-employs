// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads que han sido marcados como "checked" (verificados)
const getLeadChecked = async () => {
  // Busca todos los registros de lead en la colección 'Lead' que cumplen ciertas condiciones
  const leadChequed = await Lead.find({
    checked: true, // Campo "checked" debe ser igual a true (verificados)
    freelancer: { $ne: true }, // Campo "freelancer" no debe ser igual a true (no freelancers)
    status: {
      // Campo "status" no debe ser ninguno de los siguientes valores:
      $nin: ["No responde", "Agenda llamada", "discard", "discard_bot"],
    },
  });

  return leadChequed; // Devuelve un array con los leads que cumplen con las condiciones
};

module.exports = getLeadChecked;
