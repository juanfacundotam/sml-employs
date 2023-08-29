// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para limpiar los valores relacionados con un usuario C-level (corredor o vendedor) en la colección Lead
const cleanValueClevel = async (email) => {
  // Actualizar múltiples campos para los registros donde el correo electrónico del corredor coincida con el proporcionado
  // Se establecen varios campos en valores predeterminados para restablecerlos
  const leadResult = await Promise.all([
    // Actualizar los registros donde el corredor coincide con el correo electrónico
    Lead.updateMany(
      { corredor: email },
      {
        $set: {
          status: "Sin contactar",
          status_op: "",
          llamados: 0,
          vendedor: "",
          vendedor_name: "",
          corredor: "",
          corredor_name: "",
          checked: false,
          view: false,
          deleted: false,
          observaciones_ventas: [],
          linkActivado: false,
          emailApp: "",
          linkPago: false,
          edicion: false,
        },
      }
    ),

    // Actualizar los registros donde el vendedor coincide con el correo electrónico
    Lead.updateMany(
      { vendedor: email },
      {
        $set: {
          status: "Sin contactar",
          status_op: "",
          llamados: 0,
          vendedor: "",
          vendedor_name: "",
          checked: true,
          view: true,
          deleted: false,
          observaciones_ventas: [],
          linkActivado: false,
          emailApp: "",
          linkPago: false,
          edicion: false,
        },
      }
    ),
  ]);

  // Devolver el resultado de las actualizaciones
  return leadResult;
};

// Exportar la función 'cleanValueClevel' para su uso externo
module.exports = cleanValueClevel;
