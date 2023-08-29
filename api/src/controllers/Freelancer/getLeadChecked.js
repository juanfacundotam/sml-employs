// Importamos el modelo de Lead desde la ruta relativa "../../models/Lead"
const Lead = require("../../models/Lead");

// Función asincrónica para obtener leads verificados según ciertos criterios
const getLeadChecked = async (body) => {
  // Declaración de variables para almacenar los leads encontrados por nivel

  await Lead.updateMany(
    { vendedor: body.email, status: "Sin contactar" },
    {
      $set: {
        status_op: "",
        llamados: 0,
        checked: true,
        view: true,
        deleted: false,
        updateVendedor: "",
      },
    }
  );

  const dateVendedor = new Date();
  const formattedTimeVendedor = dateVendedor.toISOString();

  let leadRest = [];
  let leadRestNivel2 = [];
  let leadRestNivel1 = [];
  let leadRestNivel3 = [];
  let leadQuery = {};

  // Búsqueda de leads para el nivel 2
  if (body.level == "2") {
    // Construcción de la consulta para buscar leads del nivel 2 según los criterios proporcionados en "body"
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "2",
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }

    // Ejecución de la consulta y almacenamiento de los resultados en "leadRestNivel2"
    leadRestNivel2 = await Lead.find(leadQuery).limit(5).exec();
  } else if (body.level === "1") {
    // Búsqueda de leads para el nivel 1 con criterios similares
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "1",
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }

    leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
  } else if (body.level === "0") {
    // Búsqueda de leads para el nivel 0 con criterios similares
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "0",
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }
    leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
  } else if (body.level === "aleatorio") {
    // Búsqueda de leads aleatorios con criterios similares
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }
    leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
  } else {
    // Búsqueda de leads para otros niveles con criterios similares
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-", "1"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }
    leadRestNivel2 = await Lead.find(leadQuery).limit(5).exec();

    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-", "2"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }

    let count2 = 0;
    count2 = 5 - leadRestNivel2.length;
    if (count2 > 0 && count2 <= 5) {
      leadRestNivel1 = await Lead.find(leadQuery).limit(count2).exec();
    }

    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "1", "", "-", "2"] },
    };
    if (body.email) {
      leadQuery["vendedor"] = body.email;
    }
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }

    let count3 = 0;
    count3 = 5 - (leadRestNivel2.length + leadRestNivel1.length);
    if (count3 > 0 && count3 <= 5) {
      leadRestNivel3 = await Lead.find(leadQuery).limit(count3).exec();
    }
  }

  // Combinación de los resultados de los diferentes niveles de leads en una sola lista
  leadRest = [...leadRestNivel2, ...leadRestNivel1, ...leadRestNivel3];

  // Búsqueda de leads que no respondieron al contacto ("No responde")
  // const leadChequedInactiveNoResponde = await Lead.find({
  //   checked: true,
  //   vendedor: body.email,
  //   status: "No responde",
  //   level: { $nin: ["incidencia", "", "-"] },
  // });
  if (leadRest.length > 0) {
    const updates = leadRest.map((element) => ({
      updateOne: {
        filter: { _id: element._id },
        update: {
          vendedor: body.email,
          vendedor_name: body.name,
          updateVendedor: formattedTimeVendedor,
        },
      },
    }));
    await Lead.bulkWrite(updates);
  }
  // Ordenación de los leads que no respondieron por fecha de actualización
  // const leadsNoRespondenSorted = leadChequedInactiveNoResponde.sort((a, b) => {
  //   // ...
  // });

  // Devolver una lista que combina los leads encontrados en los diferentes niveles y los leads que no respondieron
  return [...leadRest];
  // return [...leadRest, ...leadsNoRespondenSorted];
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = getLeadChecked;
