// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) de un freelancer por nombre de corredor
const findLeadFreelancerName = async (name) => {
  // Buscar en la colección Lead los registros donde el campo "corredor_name" coincida con el nombre proporcionado
  // y también donde el campo "freelancer" sea igual a true (es decir, el cliente potencial es un freelancer)
  const leads = await Lead.find({
    corredor_name: name,
    freelancer: true,
  }).exec();

  // Devolver los registros de leads que cumplen con los criterios de búsqueda
  return leads;
};

// Exportar la función 'findLeadFreelancerName' para su uso externo
module.exports = findLeadFreelancerName;
