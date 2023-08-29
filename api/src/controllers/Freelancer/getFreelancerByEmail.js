// Importamos el modelo de Freelancer desde la ruta relativa "../../models/Freelancer"
const Freelancer = require("../../models/Freelancer");

// Función asincrónica para obtener un freelancer por su dirección de correo electrónico (email)
const getFreelancerByEmail = async (email) => {
  // Buscamos un freelancer en la base de datos que coincida con la dirección de correo electrónico proporcionada (email)
  const freelancer = await Freelancer.findOne({ email: email });

  return freelancer; // Devolvemos el freelancer encontrado (puede ser null si no se encuentra ningún freelancer con ese email)
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = getFreelancerByEmail;
