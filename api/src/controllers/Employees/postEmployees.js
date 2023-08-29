// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada postEmployees que creará un nuevo registro de Employees en la base de datos
const postEmployees = async ({
  name,
  email,
  rol,
  birthdate,
  photo,
  country,
  contactNumber,
  description,
  deleted,
}) => {
  // Crear un nuevo registro de Employees en la base de datos utilizando el método "create" del modelo Employees
  const employees = await Employees.create({
    name,
    email,
    rol,
    birthdate,
    photo,
    country,
    contactNumber,
    description,
    deleted,
  });

  // Retornar el nuevo registro creado
  return employees;
};

// Exportar la función postEmployees para que esté disponible en otros módulos
module.exports = postEmployees;
