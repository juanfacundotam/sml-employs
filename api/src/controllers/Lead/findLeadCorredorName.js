// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) por nombre de corredor
const findLeadCorredorName = async (name) => {
  // Buscar en la colección Lead los registros que cumplan con ciertos criterios de filtro:
  const leads = await Lead.find({
    // El campo "corredor" debe coincidir con el nombre proporcionado
    corredor: name,

    // El campo "checked" debe ser igual a true
    checked: true,

    // El campo "view" debe ser igual a true
    view: true,

    // El campo "status" no debe estar en el conjunto ["No responde", "Agenda llamada", "incidencia"]
    status: {
      $nin: ["No responde", "Agenda llamada", "incidencia"],
    },
  }).exec();

  // Devolver los registros de leads que cumplen con los criterios de filtro
  return leads;
};

// Exportar la función 'findLeadCorredorName' para su uso externo
module.exports = findLeadCorredorName;
