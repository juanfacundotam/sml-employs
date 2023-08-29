// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función asincrónica para crear un nuevo Corredor en la base de datos
const postCorredor = async ({
  name,
  email,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  classifications,
  average_delay,
  incidences,
  hired_leads,
  rol,
  deleted,
}) => {
  // Crear un nuevo Corredor en la base de datos utilizando los datos proporcionados
  const corredor = await Corredor.create({
    name,
    email,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    classifications,
    average_delay,
    incidences,
    hired_leads,
    rol,
    deleted,
  });

  // Devolver el resultado de la creación del Corredor (el Corredor recién creado)
  return corredor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = postCorredor;
