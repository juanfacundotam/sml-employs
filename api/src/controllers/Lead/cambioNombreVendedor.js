// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para cambiar el nombre del vendedor en la colección Lead
const cambioNombreVendedor = async (body) => {
  // Extraer datos del cuerpo de la solicitud
  const { email, name } = body;

  // Actualizar el nombre del vendedor en todos los registros donde el correo electrónico del corredor coincida
  const leadResult = await Lead.updateMany(
    { vendedor: email },
    {
      vendedor_name: name,
    }
  );

  // Devolver el resultado de la actualización
  return leadResult;
};

// Exportar la función 'cambioNombreVendedor' para su uso externo
module.exports = cambioNombreVendedor;
