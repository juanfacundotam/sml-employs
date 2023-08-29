// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para buscar clientes potenciales (leads) con información detallada, utilizando varios criterios de búsqueda relacionados con el vendedor
const findLeadVendedorNameAllInfo = async (
  email,
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
    vendedor: email, // El campo "vendedor" debe coincidir con el correo electrónico proporcionado
    checked: true, // Se debe haber verificado (checked) el cliente potencial
    view: true, // El cliente potencial debe estar marcado como "visto" (view)
  };

  // Agregar criterios adicionales al objeto "query" si se proporcionan ciertos valores en los parámetros de búsqueda:

  if (fromDay && toDay) {
    // Si se proporcionan fechas de inicio y fin, crear un rango de búsqueda para el campo "updateVendedor"
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
    query.updateVendedor = {
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
    // Si se proporciona el estado, verificar si es diferente de "Sin contactar"
    if (status !== "Sin contactar") {
      query.status = status; // Si es diferente de "Sin contactar", agregarlo al filtro
    }
  } else {
    // Si no se proporciona el estado, agregarlo al filtro como diferente de "Sin contactar"
    query.status = { $ne: "Sin contactar" };
  }

  if (descargados) {
    query.descargadosLeader = descargados; // Si se proporciona el valor "descargados", agregarlo al filtro
  }

  // Realizar la búsqueda de clientes potenciales (leads) utilizando el objeto "query" como filtro
  const leads = await Lead.find(query).exec();

  // Devolver los clientes potenciales que coinciden con los criterios de búsqueda
  return leads;
};

// Exportar la función 'findLeadVendedorNameAllInfo' para su uso externo
module.exports = findLeadVendedorNameAllInfo;
