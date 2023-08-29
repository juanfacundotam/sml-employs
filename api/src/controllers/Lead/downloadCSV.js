// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para descargar datos de clientes potenciales (leads) filtrados por niveles
const dowloadCSV = async (niveles) => {
  // Buscar en la colección Lead todos los registros donde el campo "nivel" esté presente en el arreglo 'niveles'
  const leads = await Lead.find({ nivel: { $in: niveles } });

  // Devolver los registros de leads que coinciden con los niveles proporcionados
  return leads;
};

// Exportar la función 'dowloadCSV' para su uso externo
module.exports = dowloadCSV;
