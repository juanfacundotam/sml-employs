// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads verificados que tienen el estado "discard_bot"
const getLeadDiscard = async () => {
  // Utiliza el método 'find' para buscar todos los registros de lead en la colección 'Lead'
  // donde el campo 'checked' es igual a true (verificados) y el campo 'status' es igual a "discard_bot"
  const leadChequed = await Lead.find({
    checked: true,
    view: true,
    status: "discard",
  });

  return leadChequed; // Devuelve un array con los leads verificados que tienen el estado "discard_bot"
};

module.exports = getLeadDiscard;
