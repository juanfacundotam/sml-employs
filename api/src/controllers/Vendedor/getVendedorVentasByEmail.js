// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");
// Importar el modelo de datos del Lead (probablemente un esquema de Mongoose)
const Lead = require("../../models/Lead");

// Función asincrónica para obtener los leads de ventas de un vendedor por su dirección de correo electrónico
const getVendedorVentasByEmail = async (body) => {
  // Buscar todos los leads en la base de datos donde el campo "vendedor" coincide con el correo electrónico proporcionado
  // y el campo "status" es igual a "Agenda llamada"
  let leadsAgenda = [];
  let leadsContactado = [];
  let leadsEnProceso = [];
  let leadsNoResponde = [];

  let leadQuery = {
    vendedor: body.email,
    // pagoRecibido: { $ne: true },
  };
  if (body.country) {
    leadQuery["country"] = body.country;
  }
  if (body.profesion) {
    leadQuery["profesion"] = body.profesion;
  }
  if (body.level) {
    leadQuery["level"] = body.level;
  }
  if (body.status) {
    leadQuery["status"] = body.status;
  }
  if (body.freelancer) {
    leadQuery["from"] = body.freelancer;
  }

  if (body.status === "Agenda llamada") {
    // leadsAgenda = await Lead.find({ vendedor: body.email, pagoRecibido: { $ne: true }, status:"Agenda llamada"});
    leadsAgenda = await Lead.find(leadQuery);
  } else if (body.status === "Contactado") {
    // leads = await Lead.find({ vendedor: body.email, pagoRecibido: { $ne: true }, status:"Contactado"});
    leadsContactado = await Lead.find(leadQuery);
  } else if (body.status === "En proceso") {
    // leads = await Lead.find({ vendedor: body.email, pagoRecibido: { $ne: true }, status:"Contactado"});
    leadsEnProceso = await Lead.find(leadQuery);
  } else if (body.status === "No responde") {
    // leadsNoResponde = await Lead.find({ vendedor: body.email, pagoRecibido: { $ne: true }, status:"No responde"});
    leadsNoResponde = await Lead.find(leadQuery);
  } else {
    leadQuery["status"] = "Agenda llamada";
    leadsAgenda = await Lead.find(leadQuery);
    leadQuery["status"] = "Contactado";
    leadsContactado = await Lead.find(leadQuery);
    leadQuery["status"] = "En proceso";
    leadsEnProceso = await Lead.find(leadQuery);
    leadQuery["status"] = "No responde";
    leadsNoResponde = await Lead.find(leadQuery);
  }

  //-------------------------------------------------------------------------------------------------------------------------
  // Ordenar los leads encontrados por fecha de llamada de venta
  const leadsAgendaSorted = leadsAgenda.sort((a, b) => {
    //Obtener las fechas de llamada de venta (se supone que están en la propiedad "llamada_venta" del lead)
    const dateA = a.llamada_venta?.dateObject; // El operador opcional "?." se asegura de que "a.llamada_venta" exista
    const dateB = b.llamada_venta?.dateObject; // El operador opcional "?." se asegura de que "b.llamada_venta" exista

    //Comparar las fechas de llamada de venta para ordenar los leads en orden ascendente
    if (!dateA.mes) return 1; // Si dateA no tiene mes, lo coloca después de dateB
    if (!dateB.mes) return -1; // Si dateB no tiene mes, lo coloca antes de dateA

    //Compara primero por año, luego por mes, día, hora y minutos en caso de empates
    if (dateA.year !== dateB.year) {
      return dateA.year - dateB.year;
    }
    if (dateA.mes !== dateB.mes) {
      return dateA.mes - dateB.mes;
    }
    if (dateA.dia !== dateB.dia) {
      return dateA.dia - dateB.dia;
    }
    if (dateA.hora !== dateB.hora) {
      return dateA.hora - dateB.hora;
    }
    if (dateA.minutos !== dateB.minutos) {
      return dateA.minutos - dateB.minutos;
    }

    //Si llega hasta aquí, significa que las fechas son iguales
    return 0;
  });
  //-------------------------------------------------------------------------------------------------------------------------

  const leadsNoRespondenSorted = leadsNoResponde.sort((a, b) => {
    const dateA = a.updatedAt.toISOString();
    const dateB = b.updatedAt.toISOString();

    if (dateA.slice(0, 4) !== dateB.slice(0, 4)) {
      return dateA.slice(0, 4) - dateB.slice(0, 4);
    }

    if (dateA.slice(5, 7) !== dateB.slice(5, 7)) {
      return dateA.slice(5, 7) - dateB.slice(5, 7);
    }

    if (dateA.slice(8, 10) !== dateB.slice(8, 10)) {
      return dateA.slice(8, 10) - dateB.slice(8, 10);
    }

    if (dateA.slice(11, 13) !== dateB.slice(11, 13)) {
      return dateA.slice(11, 13) - dateB.slice(11, 13);
    }

    if (dateA.slice(14, 16) !== dateB.slice(14, 16)) {
      return dateA.slice(14, 16) - dateB.slice(14, 16);
    }

    return 0;
  });

  // Devolver el resultado de la consulta (los leads de ventas ordenados por fecha de llamada de venta)
  // return sortClients;
  return [
    ...leadsAgendaSorted,
    ...leadsContactado,
    ...leadsEnProceso,
    ...leadsNoRespondenSorted,
  ];
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getVendedorVentasByEmail;
