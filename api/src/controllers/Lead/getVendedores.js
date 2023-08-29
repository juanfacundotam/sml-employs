// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener los nombres de los vendedores que no son freelancers
const getVendedores = async () => {
  // Utiliza el método 'distinct' para buscar los valores únicos del campo 'vendedor_name' en la colección 'Lead'
  // donde el campo 'freelancer' es igual a false (no son freelancers)
  const vendedores = await Lead.distinct("vendedor_name", {
    freelancer: false,
  });

  return vendedores; // Devuelve un array con los nombres de los vendedores que no son freelancers
};

module.exports = getVendedores;
