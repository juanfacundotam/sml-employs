// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

const setPagoLink = async (body) => {
  const lead = await Lead.findByIdAndUpdate(
    body.id,
    {
      $set: {
        linkActivado: true,
        linkPago: body.linkPago,
      },
    },
    { new: true }
  );

  return lead;
};

module.exports = setPagoLink;
