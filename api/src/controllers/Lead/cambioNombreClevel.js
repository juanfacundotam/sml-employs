// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para cambiar el nombre del corredor y vendedor en la colección Lead
const cambioNombreClevel = async (body) => {
  // Extraer datos del cuerpo de la solicitud
  const { email, name } = body;

  // Actualizar el nombre del corredor en todos los registros donde el corredor coincida con el correo electrónico
  const corredorUpdateResult = await Lead.updateMany(
    { corredor: email },
    { $set: { corredor_name: name } }
  );

  // Actualizar el nombre del vendedor en todos los registros donde el vendedor coincida con el correo electrónico
  const vendedorUpdateResult = await Lead.updateMany(
    { vendedor: email },
    { $set: { vendedor_name: name } }
  );

  // Devolver los resultados de las actualizaciones para corredor y vendedor
  return {
    corredorUpdateResult,
    vendedorUpdateResult,
  };
};

// Exportar la función 'cambioNombreClevel' para su uso externo
module.exports = cambioNombreClevel;
