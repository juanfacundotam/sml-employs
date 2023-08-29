// Importamos el modelo de Freelancer desde la ruta relativa "../../models/Freelancer"
const Freelancer = require("../../models/Freelancer");

// Función asincrónica para crear un nuevo freelancer en la base de datos
const postFreelancer = async ({
  name,
  email,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  rol,
  deleted,
}) => {
  // Creamos un nuevo freelancer en la base de datos utilizando el modelo "Freelancer"
  const freelancer = await Freelancer.create({
    name,
    email,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    rol,
    deleted,
  });

  return freelancer; // Devolvemos el freelancer recién creado
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = postFreelancer;
