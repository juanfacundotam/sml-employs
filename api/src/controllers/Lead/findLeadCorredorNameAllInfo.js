// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) con información detallada, utilizando varios criterios de búsqueda
const findLeadCorredorNameAllInfo = async (
  corredor,
  vendedor,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status,
  descargados
) => {
  // Crear un objeto "query" con los criterios de búsqueda iniciales:
  const query = {
    checked: true, // Se debe haber verificado (checked) el cliente potencial
    view: true, // El cliente potencial debe estar marcado como "visto" (view)
    freelancer: false, // El cliente potencial no debe ser un freelancer
  };

  // Agregar criterios adicionales al objeto "query" si se proporcionan ciertos valores en los parámetros de búsqueda:

  if (corredor !== "") {
    query.corredor_name = corredor; // Si se proporciona el nombre del corredor, agregarlo al filtro
  }

  if (vendedor !== "") {
    query.vendedor_name = vendedor; // Si se proporciona el nombre del vendedor, agregarlo al filtro
  }

  if (fromDay && toDay) {
    // Si se proporcionan fechas de inicio y fin, crear un rango de búsqueda para el campo "updateCorredor"
    const [fromYear, fromMonth, fromDayOfMonth] = fromDay.split("-");
    const [toYear, toMonth, toDayOfMonth] = toDay.split("-");

    const startDate = new Date(
      parseInt(fromYear),
      parseInt(fromMonth) - 1,
      parseInt(fromDayOfMonth),
      -3,
      0,
      0
    );
    const endDate = new Date(
      parseInt(toYear),
      parseInt(toMonth) - 1,
      parseInt(toDayOfMonth),
      20,
      59,
      59
    );
    console.log(startDate);
    console.log(endDate);
    query.updateCorredor = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  if (profesion) {
    query.profesion = profesion; // Si se proporciona la profesión, agregarla al filtro
  }

  if (country) {
    query.country = country; // Si se proporciona el país, agregarlo al filtro
  }

  if (category) {
    query.category = category; // Si se proporciona la categoría, agregarla al filtro
  }

  if (level) {
    query.level = level; // Si se proporciona el nivel, agregarlo al filtro
  }

  if (status) {
    query.status = status; // Si se proporciona el estado, agregarlo al filtro
  }

  if (descargados === "false") {
    query.descargadosLeader = false; // Si descargados es "false", agregarlo al filtro como "descargadosLeader: false"
  }

  // Realizar la búsqueda de clientes potenciales (leads) utilizando el objeto "query" como filtro
  const leads = await Lead.find(query).exec();

  // Devolver los clientes potenciales que coinciden con los criterios de búsqueda
  return leads;
};

// Exportar la función 'findLeadCorredorNameAllInfo' para su uso externo
module.exports = findLeadCorredorNameAllInfo;
