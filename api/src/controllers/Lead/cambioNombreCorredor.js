// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para cambiar el nombre del corredor en la colección Lead
const cambioNombreCorredor = async (body) => {
  // Extraer datos del cuerpo de la solicitud
  const { email, name } = body;

  // Actualizar el nombre del corredor en todos los registros donde el correo electrónico del corredor coincida
  const leadResult = await Lead.updateMany(
    { corredor: email },
    {
      corredor_name: name,
    }
  );

  // Devolver el resultado de la actualización
  return leadResult;
};

// Exportar la función 'cambioNombreCorredor' para su uso externo
module.exports = cambioNombreCorredor;
