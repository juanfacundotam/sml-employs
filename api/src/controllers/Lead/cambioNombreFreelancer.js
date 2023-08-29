// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para cambiar el nombre del corredor y vendedor (si son freelancers) en la colección Lead
const cambioNombreFreelancer = async (body) => {
  // Extraer datos del cuerpo de la solicitud
  const { email, name } = body;

  // Actualizar el nombre del corredor y vendedor en todos los registros donde el correo electrónico del corredor coincida y también sean freelancers
  const leadResult = await Lead.updateMany(
    { corredor: email, freelancer: true },
    {
      corredor_name: name,
      vendedor_name: name,
    }
  );

  // Devolver el resultado de la actualización
  return leadResult;
};

// Exportar la función 'cambioNombreFreelancer' para su uso externo
module.exports = cambioNombreFreelancer;
