// Importar el modelo de datos del Lead (probablemente un esquema de Mongoose)
const Lead = require("../../models/Lead");

// Función asincrónica para obtener todos los leads de un vendedor por su dirección de correo electrónico
const getVendedorByEmail = async (email) => {
  // Buscar todos los leads en la base de datos donde el campo "vendedor" coincide con el correo electrónico proporcionado
  const Leads = await Lead.find({ vendedor: email });

  // Devolver el resultado de la consulta (todos los leads encontrados para el vendedor específico)
  return Leads;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getVendedorByEmail;
