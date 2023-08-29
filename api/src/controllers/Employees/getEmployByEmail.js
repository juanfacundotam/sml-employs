// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada getEmployeesByEmail que buscará registros de Employees por dirección de correo electrónico
const getEmployeesByEmail = async (Email) => {
  // Crear una expresión regular (regex) para realizar una búsqueda insensible a mayúsculas y minúsculas del correo electrónico proporcionado
  const regex = new RegExp(Email, "i");

  // Utilizar el método "find" del modelo Employees para buscar registros que coincidan con el correo electrónico proporcionado mediante la expresión regular
  const employ = await Employees.find({ email: { $regex: regex } });

  // Retornar los registros de empleados encontrados (puede ser un array vacío si no se encuentran coincidencias)
  return employ;
};

// Exportar la función getEmployeesByEmail para que esté disponible en otros módulos
module.exports = getEmployeesByEmail;
