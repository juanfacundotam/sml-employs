// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener hasta 100 leads que han sido marcados como "checked" (verificados)
const getLeadChecked100 = async () => {
  // Utiliza el método 'find' para buscar todos los registros de lead en la colección 'Lead'
  // donde el campo 'checked' es igual a true (verificados)
  // Luego, utiliza el método 'limit(100)' para limitar los resultados a un máximo de 100 registros
  // y 'exec()' para ejecutar la consulta
  const leadChequed = await Lead.find({ checked: true }).limit(100).exec();

  return leadChequed; // Devuelve un array con los primeros 100 leads verificados encontrados
};

module.exports = getLeadChecked100;
