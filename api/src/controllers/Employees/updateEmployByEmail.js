// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada updateEmployByEmail que actualizará un registro de Employees por correo electrónico
const updateEmployByEmail = async (email, updatedData) => {
  // Utilizar el método "findOneAndUpdate" del modelo Employees para buscar un registro por correo electrónico y actualizarlo con los datos proporcionados
  // El argumento { email } es una abreviatura de { email: email }, que busca un registro con el correo electrónico proporcionado
  // updatedData es un objeto que contiene los campos y valores que se deben actualizar en el registro encontrado
  // El tercer argumento { new: true } devuelve el registro actualizado en lugar del registro anterior a la actualización
  const employ = await Employees.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });

  // Retornar el registro actualizado
  return employ;
};

// Exportar la función updateEmployByEmail para que esté disponible en otros módulos
module.exports = updateEmployByEmail;
