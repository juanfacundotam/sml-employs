// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada getEmployeesBanned que obtendrá todos los registros de Employees marcados como eliminados (deleted: true)
const getEmployeesBanned = async () => {
  // Utilizar el método "find" del modelo Employees para obtener todos los registros que están marcados como eliminados
  const employees = await Employees.find({ deleted: true });

  // Retornar los registros de empleados marcados como eliminados (puede ser un array vacío si no hay empleados eliminados)
  return employees;
};

// Exportar la función getEmployeesBanned para que esté disponible en otros módulos
module.exports = getEmployeesBanned;
