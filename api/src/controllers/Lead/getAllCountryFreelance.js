// Importar el modelo Lead desde el archivo que contiene el modelo
const Lead = require("../../models/Lead");

// Definir una función asíncrona llamada getAllCountryFreelance que toma el parámetro "email"
const getAllCountryFreelance = async (email) => {
  // Obtener una lista de países únicos donde:
  // - La propiedad "checked" es verdadera
  // - La propiedad "view" es verdadera
  // - La propiedad "vendedor" es igual al valor del parámetro "email"
  // - La propiedad "status" es "Sin contactar"
  const countries = await Lead.distinct("country", {
    checked: true,
    view: true,
    vendedor: email,
    status: "Sin contactar",
  });

  // Devolver la lista de países encontrados
  return countries;
};

// Exportar la función getAllCountryFreelance para que pueda ser utilizada en otros archivos
module.exports = getAllCountryFreelance;
