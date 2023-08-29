// Importar el modelo Leader desde la ubicación correcta
const Leader = require("../../models/Leader");

// Definir una función asincrónica llamada postLeader que creará un nuevo registro de Leader en la base de datos
const postLeader = async ({
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
  // Crear un nuevo registro de Leader en la base de datos utilizando el método "create" del modelo Leader
  // Algunos campos opcionales (birthdate, photo, country, contactNumber, description) se establecen en un valor predeterminado ("" o vacío) si no se proporcionan
  const leader = await Leader.create({
    name,
    email,
    birthdate: birthdate ?? "",
    photo: photo ?? "",
    country: country ?? "",
    contactNumber: contactNumber ?? "",
    description: description ?? "",
    rol,
    deleted,
  });

  // Retornar el nuevo registro creado
  return leader;
};

// Exportar la función postLeader para que esté disponible en otros módulos
module.exports = postLeader;
