// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads no verificados (checked = false)
const getLeadUnchecked = async () => {
  // Utiliza el método 'find' para buscar todos los registros de lead en la colección 'Lead'
  // donde el campo 'checked' es igual a false (no verificados)
  const leadUnchecked = await Lead.find({ checked: false });

  return leadUnchecked; // Devuelve un array con los leads no verificados
};

module.exports = getLeadUnchecked;
