// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada deleteEmployByEmail que eliminará un registro de Employees por correo electrónico
const deleteEmployByEmail = async (email) => {
  // Utilizar el método "findOneAndDelete" del modelo Employees para buscar y eliminar un registro por correo electrónico
  const employ = await Employees.findOneAndDelete({ email: email });

  // Retornar el registro que ha sido eliminado (puede ser un objeto o null si no se encuentra ningún registro con ese correo electrónico)
  return employ;
};

// Exportar la función deleteEmployByEmail para que esté disponible en otros módulos
module.exports = deleteEmployByEmail;
