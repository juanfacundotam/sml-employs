// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads verificados que están inactivos por 5 días o menos
const getLeadCheckedInactive5 = async (body) => {

  // Actualiza todos los leads que pertenecen al vendedor (email) y tienen el estado "Sin contactar"
  await Lead.updateMany(
    { vendedor: body.email, status: "Sin contactar" },
    {
      $set: {
        status_op: "",
        llamados: 0,
        vendedor: "",
        vendedor_name: "",
        checked: true,
        view: true,
        deleted: false,
        updateVendedor: "",
      },
    }
  );

  // BUSCA LOS LEADS QUE ESTÁN EN EL ESTADO "NO RESPONDE"
  // const leadChequedInactiveNoResponde = await Lead.find({
  //   checked: true,
  //   vendedor: body.email,
  //   status: "No responde",
  //   level: { $nin: ["incidencia", "0", "", "-"] },
  // });

  // Ordena los leads por la fecha de actualización (updatedAt) en orden ascendente (los más antiguos primero)
  // const leadsNoRespondenSorted = leadChequedInactiveNoResponde.sort((a, b) => {
  //   const dateA = a.updatedAt.toISOString();
  //   const dateB = b.updatedAt.toISOString();

    // Compara las fechas de actualización para determinar el orden de clasificación
    // Se ordenan primero los registros más antiguos
  //   if (dateA < dateB) {
  //     return -1;
  //   } else if (dateA > dateB) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });
  
  const dateVendedor = new Date();
  const formattedTimeVendedor = dateVendedor.toISOString();


  let leadRest = [];
  let leadRestNivel2 = [];
  let leadRestNivel1 = [];
  let leadQuery = {};

  // Lógica para determinar el nivel de leads a buscar según el valor de 'body.level'
  if (body.level == "2") {
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "2",
      freelancer: false,
    };
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
  } else if (body.level === "1") {
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: "1",
      freelancer: false,
    };
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
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-"] },
      freelancer: false,
    };
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
    leadQuery = {
      checked: true,
      status: "Sin contactar",
      level: { $nin: ["incidencia", "0", "", "-", "1"] },
      freelancer: false,
    };
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
      freelancer: false,
    };
    if (body.country) {
      leadQuery["country"] = body.country;
    }
    if (body.profesion) {
      leadQuery["profesion"] = body.profesion;
    }
    if (body.freelancer) {
      leadQuery["from"] = body.freelancer;
    }

    // Calcula la cantidad de leads que aún se pueden agregar a 'leadRestNivel1'
    let count2 = 0;
    count2 = 5 - leadRestNivel2.length;
    if (count2 > 0 && count2 <= 5) {
      leadRestNivel1 = await Lead.find(leadQuery).limit(count2).exec();
    }
  }

  // Concatena los arrays de leads de diferentes niveles en un solo array 'leadRest'
  leadRest = [...leadRestNivel2, ...leadRestNivel1];

  // Actualiza los leads de 'leadRest' con la información del vendedor (email y nombre)
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

  // Retorna un array con los leads que cumplen las condiciones
  return [...leadRest];
  // return [...leadRest, ...leadsNoRespondenSorted];
};

module.exports = getLeadCheckedInactive5;


// const Lead = require("../../models/Lead");

// const getLeadCheckedInactive5 = async (body) => {

//   await Lead.updateMany(
//     { vendedor: body.email, status: "Sin contactar" },
//     {
//       $set: {
//         status_op: "",
//         llamados: 0,
//         vendedor: "",
//         vendedor_name: "",
//         checked: true,
//         view: true,
//         deleted: false,
//       },
//     }
//     );
//     // BUSCA LOS QUE TENGA MI MAIL
//     // let leadQuery = {
//       //   checked: true,
//       //   status: "Sin contactar",
//       //   level: { $nin: ["incidencia", "0", "", "-"] },
//       // };
      
//       // if (body.email) {
//   //   leadQuery["vendedor"] = body.email;
//   // }
//   // if (body.country) {
//   //   leadQuery["country"] = body.country;
//   // }
//   // if (body.profesion) {
//   //   leadQuery["profesion"] = body.profesion;
//   // }
//   // if (body.level && (body.level === "1" || body.level === "2")) {
//     //   leadQuery["level"] = body.level;
//     // }
//   // if (body.level && body.level === "aleatorio") {
//   //   leadQuery["level"] = { $nin: ["incidencia", "0", "", "-"] };
//   // }
  
//   // const leadChequedInactive = await Lead.find(leadQuery).limit(5).exec();
  
//   // BUSCA LOS NO RESPONDE --------------------------
//   const leadChequedInactiveNoResponde = await Lead.find({
//     checked: true,
//     vendedor: body.email,
//     status: "No responde",
//     level: { $nin: ["incidencia", "0", "", "-"] },
//   });
  
//   const leadsNoRespondenSorted = leadChequedInactiveNoResponde.sort((a, b) => {
//     const dateA = a.updatedAt.toISOString();
//     const dateB = b.updatedAt.toISOString();
    
//     if (dateA.slice(0, 4) !== dateB.slice(0, 4)) {
//       return dateA.slice(0, 4) - dateB.slice(0, 4);
//     }
    
//     if (dateA.slice(5, 7) !== dateB.slice(5, 7)) {
//       return dateA.slice(5, 7) - dateB.slice(5, 7);
//     }
    
//     if (dateA.slice(8, 10) !== dateB.slice(8, 10)) {
//       return dateA.slice(8, 10) - dateB.slice(8, 10);
//     }
    
//     if (dateA.slice(11, 13) !== dateB.slice(11, 13)) {
//       return dateA.slice(11, 13) - dateB.slice(11, 13);
//     }
    
//     if (dateA.slice(14, 16) !== dateB.slice(14, 16)) {
//       return dateA.slice(14, 16) - dateB.slice(14, 16);
//     }

//     return 0;
//   });
//   //--------------------------------------------------

  
  
//   let leadRest = [];
//   let leadRestNivel2 = [];
//   let leadRestNivel1 = [];
//   let leadQuery = {};

//   if (body.level == "2") {
//     leadQuery = {
//       checked: true,
//       status: "Sin contactar",
//       level: "2",
//     };
//     // if (body.email) {
//     //   leadQuery["vendedor"] = body.email;
//     // }
//     if (body.country) {
//       leadQuery["country"] = body.country;
//     }
//     if (body.profesion) {
//       leadQuery["profesion"] = body.profesion;
//     }
    
//     leadRestNivel2 = await Lead.find(leadQuery).limit(5).exec();
//   } else if (body.level === "1") {
//     leadQuery = {
//       checked: true,
//       status: "Sin contactar",
//       level: "1",
//     };
//     // if (body.email) {
//     //   leadQuery["vendedor"] = body.email;
//     // }
//     if (body.country) {
//       leadQuery["country"] = body.country;
//     }
//     if (body.profesion) {
//       leadQuery["profesion"] = body.profesion;
//     }

//     leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
//   } else if (body.level === "aleatorio") {
//     leadQuery = {
//       checked: true,
//       status: "Sin contactar",
//       level: { $nin: ["incidencia", "0", "", "-"] },
//     };
//     // if (body.email) {
//       //   leadQuery["vendedor"] = body.email;
//     // }
//     if (body.country) {
//       leadQuery["country"] = body.country;
//     }
//     if (body.profesion) {
//       leadQuery["profesion"] = body.profesion;
//     }
//     leadRestNivel1 = await Lead.find(leadQuery).limit(5).exec();
//   } else {
//     leadQuery = {
//       checked: true,
//       status: "Sin contactar",
//       level: { $nin: ["incidencia", "0", "", "-", "1"] },
//     };
//     // if (body.email) {
//       //   leadQuery["vendedor"] = body.email;
//       // }
//     if (body.country) {
//       leadQuery["country"] = body.country;
//     }
//     if (body.profesion) {
//       leadQuery["profesion"] = body.profesion;
//     }
//     leadRestNivel2 = await Lead.find(leadQuery).limit(5).exec();

//     leadQuery = {
//       checked: true,
//       status: "Sin contactar",
//       level: { $nin: ["incidencia", "0", "", "-", "2"] },
//     };
//     // if (body.email) {
//     //   leadQuery["vendedor"] = body.email;
//     // }
//     if (body.country) {
//       leadQuery["country"] = body.country;
//     }
//     if (body.profesion) {
//       leadQuery["profesion"] = body.profesion;
//     }
    
//     let count2 = 0;
//     count2 = 5 - leadRestNivel2.length;
//     if (count2 > 0 && count2 <= 5) {
//       leadRestNivel1 = await Lead.find(leadQuery).limit(count2).exec();
//     }
//   }
//   leadRest = [...leadRestNivel2, ...leadRestNivel1];
  


//   // if (leadRest.length > 0) {
//   //   await Promise.all(
//   //     leadRest.map(async (element) => {
//   //       element.vendedor = body.email;
//   //       element.vendedor_name = body.name;
//   //       await element.save();
//   //     })
//   //     );
//   //   }


//   if (leadRest.length > 0) {
//     const updates = leadRest.map((element) => ({
//       updateOne: {
//         filter: { _id: element._id },
//         update: {
//           vendedor: body.email,
//           vendedor_name: body.name,
//         },
//       },
//     }));
//     await Lead.bulkWrite(updates);
//   }


//   return [...leadRest, ...leadsNoRespondenSorted];

// };

// module.exports = getLeadCheckedInactive5;