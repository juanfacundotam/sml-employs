// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads verificados que pertenecen a un corredor específico y aún no han sido descargados
const getLeadCorredoresCheckedDescargados = async (email) => {
  // Utiliza el método 'find' para buscar todos los registros de lead en la colección 'Lead'
  // donde el campo 'corredor' es igual al valor de 'email' proporcionado,
  // el campo 'checked' es igual a true (verificados),
  // y el campo 'descargadosCorredor' es igual a false (no han sido descargados por el corredor)
  // Luego, utiliza el método 'exec()' para ejecutar la consulta
  const leads = await Lead.find({
    corredor: email,
    checked: true,
    descargadosCorredor: false,
  }).exec();

  return leads; // Devuelve un array con los leads verificados asociados al corredor específico que aún no han sido descargados
};

module.exports = getLeadCorredoresCheckedDescargados;
