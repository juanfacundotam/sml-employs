// Importar el modelo CLevel desde la ubicación correcta
const CLevel = require("../../models/CLevel");

// Definir una función asincrónica llamada updateCLevelByEmail que actualizará un registro de CLevel por correo electrónico
const updateCLevelByEmail = async (email, updatedData) => {
  // Utilizar el método "findOneAndUpdate" del modelo CLevel para buscar un registro por correo electrónico y actualizarlo con los datos proporcionados
  // El argumento { email } es una abreviatura de { email: email }, que busca un registro con el correo electrónico proporcionado
  // updatedData es un objeto que contiene los campos y valores que se deben actualizar en el registro encontrado
  // El tercer argumento { new: true } devuelve el registro actualizado en lugar del registro anterior a la actualización
  const clevel = await CLevel.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });

  // Retornar el registro actualizado
  return clevel;
};

// Exportar la función updateCLevelByEmail para que esté disponible en otros módulos
module.exports = updateCLevelByEmail;
