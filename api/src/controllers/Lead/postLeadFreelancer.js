// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para agregar un nuevo lead (freelancer) a la base de datos
const postLeadFreelancer = async (data) => {
  // Utiliza el método 'create' para crear un nuevo registro de lead en la base de datos
  // con los campos y valores proporcionados en el objeto 'data'
  const lead = await Lead.create(data);

  return lead; // Devuelve el registro de lead creado en la base de datos
};

module.exports = postLeadFreelancer;
