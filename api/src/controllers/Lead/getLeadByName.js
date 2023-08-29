// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener leads por su nombre utilizando una expresión regular (ignora mayúsculas/minúsculas)
const getLeadByName = async (name) => {
  // Crea una expresión regular (regex) con el nombre proporcionado y la opción "i" para ignorar mayúsculas/minúsculas
  const regex = new RegExp(name, "i");

  // Busca todos los registros de lead en la colección 'Lead' donde el campo 'name' coincide con la expresión regular
  const lead = await Lead.find({ name: { $regex: regex } });

  return lead; // Devuelve un array con los leads cuyo nombre coincide con la expresión regular
};

module.exports = getLeadByName;
