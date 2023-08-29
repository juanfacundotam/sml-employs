// Importamos el modelo de Freelancer desde la ruta relativa "../../models/Freelancer"
const Freelancer = require("../../models/Freelancer");

// Función asincrónica para obtener todos los freelancers de la base de datos
const getAllFreelancers = async () => {
  // Buscamos todos los freelancers en la base de datos utilizando el modelo "Freelancer"
  const freelancer = await Freelancer.find({ deleted: false });

  return freelancer; // Devolvemos la lista de freelancers encontrados
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = getAllFreelancers;
