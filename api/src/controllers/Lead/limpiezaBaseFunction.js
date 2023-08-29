// const Lead = require("../../models/Lead");

// const limpiezaBaseFunction = async () => {
//   const leadResult = await Lead.updateMany(
//     {corredor: "akosjev@gmail.com"},
//     {
//       $set: {
//         status: "Sin contactar",
//         status_op: "",
//         llamados: 0,
//         vendedor: "",
//         vendedor_name: "",
//         corredor: "",
//         corredor_name: "",
//         checked: false,
//         freelancer: false,
//         view: false,
//         deleted: false,
//       },
//     }
//   );
//   return leadResult;
// };

// module.exports = limpiezaBaseFunction;

// const Lead = require("../../models/Lead");

// const limpiezaBaseFunction = async () => {
//   const leadResult = await Lead.updateMany(
//     {
//       $set: {
//         status: "Sin contactar",
//         status_op: "",
//         llamados: 0,
//         vendedor: "",
//         vendedor_name: "",
//         corredor: "",
//         corredor_name: "",
//         checked: false,
//         freelancer: false,
//         view: false,
//         deleted: false,
//       },
//     }
// {
//   $set: {
//     corredor_name: "Florencia Carballo",
//   },
// }
// { vendedor: "undefined" },
// {
//   $set: {
//     // level: "",
//     status: "Sin contactar",
//     status_op: "",
//     llamados: 0,
//     vendedor: "",
//     vendedor_name: "",
//     // corredor: "",
//     // corredor_name: "",
//     checked: true,
//     view: true,
//     deleted: false,
//     // instagram: ""
//   },
// }

// { corredor: 'email' },
// {
//   $set: {
//     level: "",
//     status: "Sin contactar",
//     status_op: "",
//     llamados: 0,
//     vendedor: "",
//     vendedor_name: "",
//     corredor: "",
//     corredor_name: "",
//     checked: false,
//     view: false,
//     deleted: false,
//     instagram: ""
//   },
// }

//     { level: "" },
//     {
//       $set: {
//         level: "",
//         status: "Sin contactar",
//         status_op: "",
//         llamados: 0,
//         vendedor: "",
//         vendedor_name: "",
//         corredor: "",
//         corredor_name: "",
//         checked: false,
//         view: false,
//         deleted: false,
//         instagram: ""
//       },
//     }
//   );
//   return leadResult;
// };

// module.exports = limpiezaBaseFunction;

const Lead = require("../../models/Lead");

const limpiezaBaseFunction = async () => {
  const leadResult = await Lead.updateMany({
    $set: {
      status: "Sin contactar",
      status_op: "",
      llamados: 0,
      vendedor: "",
      vendedor_name: "",
      corredor: "",
      corredor_name: "",
      checked: false,
      freelancer: false,
      view: false,
      deleted: false,
      observaciones_ventas: [],
      linkActivado: false,
      emailApp: "",
      level: "",
      linkPago: false,
      edicion: false,
      updateContratado: "",
      updateCorredor: "",
      updateVendedor: "",
      updateSinContactar: "",
      updateRechazado: "",
      updateNoResponde: "",
      updateContactado: "",
      updateAPagar: "",
      updateSegundoLlamado: "",
      updateIncidencia: "",
      updateEnProceso: "",
    },
  });

  return leadResult;
};

module.exports = limpiezaBaseFunction;
