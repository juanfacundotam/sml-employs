// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) de freelancers con información detallada, utilizando varios criterios de búsqueda
const findLeadFreelancerNameAllInfo = async (
  freelancer,
  fromDay,
  toDay,
  profesion,
  country,
  category,
  level,
  status,
  checked,
  descargados
) => {
  // Crear un objeto "query" con los criterios de búsqueda iniciales:
  const query = {
    freelancer: true, // El cliente potencial debe ser un freelancer
  };

  // Agregar criterios adicionales al objeto "query" si se proporcionan ciertos valores en los parámetros de búsqueda:

  if (freelancer !== "") {
    query.corredor_name = freelancer; // Si se proporciona el nombre del freelancer, agregarlo al filtro
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
    query.updatedAt = {
      $gte: startDate,
      $lt: endDate,
    };
  }

  if (checked) {
    query.checked = checked; // Si se proporciona la profesión, agregarla al filtro
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
    if (status === "Sin clasificar") {
      query.status = "Sin contactar"; // Si se proporciona el estado, agregarlo al filtro
    } else {
      query.status = status; // Si se proporciona el estado, agregarlo al filtro
    }
  }

  if (descargados === "false") {
    query.descargadosLeader = false; // Si descargados es "false", agregarlo al filtro como "descargadosLeader: false"
  }

  // Realizar la búsqueda de clientes potenciales (leads) utilizando el objeto "query" como filtro
  const leads = await Lead.find(query).exec();

  // Devolver los clientes potenciales que coinciden con los criterios de búsqueda
  return leads;
};

// Exportar la función 'findLeadFreelancerNameAllInfo' para su uso externo
module.exports = findLeadFreelancerNameAllInfo;
