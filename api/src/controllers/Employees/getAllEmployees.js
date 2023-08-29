// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada getAllEmployees que obtendrá todos los registros de Employees no marcados como eliminados (deleted: false)
const getAllEmployees = async () => {
  // Utilizar el método "find" del modelo Employees para obtener todos los registros que no están marcados como eliminados
  const employees = await Employees.find({ deleted: false });

  // Retornar los registros de empleados obtenidos (puede ser un array vacío si no hay empleados o todos están marcados como eliminados)
  return employees;
};

// Exportar la función getAllEmployees para que esté disponible en otros módulos
module.exports = getAllEmployees;
