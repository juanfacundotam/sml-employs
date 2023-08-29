// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener un lead por su ID
const getLeadById = async (id) => {
  // Busca un único registro de lead en la colección 'Lead' que coincida con el ID proporcionado
  const lead = await Lead.findById(id);

  return lead; // Devuelve el lead encontrado o 'null' si no se encuentra ninguno
};

module.exports = getLeadById;
