// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener todos los leads
const getAllLeads = async () => {
  // Busca todos los registros en la colección 'Lead' y los almacena en la variable 'leads'
  const leads = await Lead.find();
  return leads; // Devuelve los leads encontrados
};

module.exports = getAllLeads;
