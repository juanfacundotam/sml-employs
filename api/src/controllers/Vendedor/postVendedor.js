// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");

// Función asincrónica para crear un nuevo Vendedor en la base de datos
const postVendedor = async ({
  name,
  email,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  leads_contacted,
  hired_leads,
  declined_leads,
  unanswered_leads,
  rol,
  deleted,
}) => {
  // Crear un nuevo Vendedor en la base de datos utilizando los datos proporcionados
  const vendedor = await Vendedor.create({
    name,
    email,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    leads_contacted,
    hired_leads,
    declined_leads,
    unanswered_leads,
    rol,
    deleted,
  });

  // Devolver el resultado de la creación del Vendedor (el Vendedor recién creado)
  return vendedor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = postVendedor;
