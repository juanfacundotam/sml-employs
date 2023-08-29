// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) con información detallada, utilizando varios criterios de búsqueda
const findLeadSeguimientoAllInfo = async (
  corredor,
  vendedor,
  freelancer,
) => {
  // Crear un objeto "query" con los criterios de búsqueda iniciales:
  const query = {
    checked: true, // Se debe haber verificado (checked) el cliente potencial
    view: true, // El cliente potencial debe estar marcado como "visto" (view)
  };

  // Agregar criterios adicionales al objeto "query" si se proporcionan ciertos valores en los parámetros de búsqueda:

  if (corredor !== "") {
    query.corredor_name = corredor; // Si se proporciona el nombre del corredor, agregarlo al filtro
  }

  if (vendedor !== "") {
    query.vendedor_name = vendedor; // Si se proporciona el nombre del vendedor, agregarlo al filtro
  }
  if (freelancer !== "") {
    query.corredor_name = freelancer; // Si se proporciona el nombre del vendedor, agregarlo al filtro
  }

  // Realizar la búsqueda de clientes potenciales (leads) utilizando el objeto "query" como filtro
  const leads = await Lead.find(query).exec();

  // Devolver los clientes potenciales que coinciden con los criterios de búsqueda
  return leads;
};

// Exportar la función 'findLeadCorredorNameAllInfo' para su uso externo
module.exports = findLeadSeguimientoAllInfo;
