// Importar los modelos Pagos y Lead desde las ubicaciones apropiadas de los archivos.
const Pagos = require("../../models/Pagos");
const Lead = require("../../models/Lead");

// Función para guardar la información de un pago y actualizar los datos del lead asociado.
// Parámetro:
// - objeto: Un objeto que contiene la información del pago.
const postInfoPago = async (objeto) => {
  // Guardar la información del pago en la base de datos utilizando el modelo Pagos.
  const infoSave = await Pagos.create({ info: objeto });

  // Inicializar un objeto para almacenar los datos actualizados del lead.
  let leadUpdate = {};

  // Buscar el lead asociado al correo electrónico del pago (comentado para probar con un correo específico).
  leadUpdate = await Lead.findOne({ emailApp: "facutam@gmail.com" });

  // Actualizar los datos del lead con la información del pago.
  leadUpdate.pagos.detallesRestantes.shift(); // Eliminar el primer elemento del array detallesRestantes.
  leadUpdate.pagos.cuotasPagadas++; // Incrementar el contador de cuotasPagadas.

  // Realizar la actualización del lead en la base de datos utilizando el modelo Lead.
  await Lead.updateOne(
    { emailApp: "facutam@gmail.com" },
    leadUpdate, // Pasar leadUpdate directamente como objeto de actualización.
    { new: true }
  );

  // Devolver un objeto que contiene la información del pago guardado y los datos actualizados del lead.
  return { info: infoSave, lead: leadUpdate };
};

// Exportar la función postInfoPago para que sea accesible desde otros módulos.
module.exports = postInfoPago;


// const Pagos = require("../../models/Pagos");
// const Lead = require("../../models/Lead");

// const postInfoPago = async (objeto) => {
//   const infoSave = await Pagos.create({ info: objeto });

//   let leadUpdate = {};
//   // if (objeto.status === "complete") {
//   // const leadUpdate = await Lead.findOne({ emailApp: objeto.email });
//   leadUpdate = await Lead.findOne({ emailApp: "facutam@gmail.com" });

//   leadUpdate.pagos.detallesRestantes.shift();
//   leadUpdate.pagos.cuotasPagadas++;

//   await Lead.updateOne(
//     { emailApp: "facutam@gmail.com" },
//     leadUpdate, // Pasar leadUpdate directamente como objeto de actualización
//     { new: true }
//   );

//   return { info: infoSave, lead: leadUpdate };
// };

// module.exports = postInfoPago;