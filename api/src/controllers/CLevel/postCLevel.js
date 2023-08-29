// Importar el modelo CLevel desde la ubicación correcta
const CLevel = require("../../models/CLevel");

// Definir una función asincrónica llamada postCLevel que creará un nuevo registro de CLevel en la base de datos
const postCLevel = async ({
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
  // Crear un nuevo registro de CLevel en la base de datos utilizando el método "create" del modelo CLevel
  const cLevel = await CLevel.create({
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

  // Retornar el nuevo registro creado
  return cLevel;
};

// Exportar la función postCLevel para que esté disponible en otros módulos
module.exports = postCLevel;
