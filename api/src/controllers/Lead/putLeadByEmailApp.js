// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads por su nombre utilizando una expresión regular (ignora mayúsculas/minúsculas)
const putLeadByEmailApp = async (emailApp, dataStripe) => {
  const lead = await Lead.findOneAndUpdate(
    {
      emailApp,
    },
    {
      $set: {
        dataStripe: dataStripe,
      },
    },
    { new: true }
  );

  return lead;
};

module.exports = putLeadByEmailApp;
