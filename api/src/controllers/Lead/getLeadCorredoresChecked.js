// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads verificados que pertenecen a un corredor específico
const getLeadCorredorChecked = async (email) => {
  // Utiliza el método 'find' para buscar todos los registros de lead en la colección 'Lead'
  // donde el campo 'corredor' es igual al valor de 'email' proporcionado y el campo 'checked' es igual a true (verificados)
  // Luego, utiliza el método 'exec()' para ejecutar la consulta
  const leads = await Lead.find({ corredor: email, checked: true });

  return leads; // Devuelve un array con los leads verificados asociados al corredor específico
};

module.exports = getLeadCorredorChecked;
