// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) por nombre de vendedor
const findLeadVendedorName = async (name) => {
  // Buscar en la colección Lead los registros donde el campo "vendedor" coincida con el nombre proporcionado
  // y donde los campos "checked" y "view" sean igual a true
  // También se excluyen ciertos valores del campo "status" utilizando el operador $nin
  const leads = await Lead.find({
    vendedor: name,
    checked: true,
    view: true,
    status: {
      $nin: ["No responde", "Agenda llamada", "incidencia"],
    },
  }).exec();

  // Devolver los registros de leads que cumplen con los criterios de búsqueda
  return leads;
};

// Exportar la función 'findLeadVendedorName' para su uso externo
module.exports = findLeadVendedorName;
