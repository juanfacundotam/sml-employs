// Importar el modelo de datos del Corredor (probablemente un esquema de Mongoose)
const Corredor = require("../../models/Corredor");

// Función para obtener el valor de los leads no chequeados de los corredores
function getValueLead() {
  // Buscar corredores en la base de datos que tengan leads no chequeados
  Corredor.find(
    { "leads.checked": false }, // Criterio de búsqueda para encontrar corredores con leads no chequeados
    "leads", // Seleccionar solo el campo "leads" de los corredores encontrados
    function (err, corredores) {
      if (err) {
        // Si ocurre un error durante la búsqueda, mostrarlo en la consola
        console.error(err);
        return;
      }

      // Iterar sobre los corredores encontrados
      corredores.forEach((corredor) => {
        // Filtrar los leads no chequeados para este corredor específico
        const leadsNoChequeados = corredor.leads.filter(
          (lead) => !lead.checked
        );

        // Aquí puedes hacer algo con la lista de leadsNoChequeados,
        // como calcular su valor o realizar alguna otra operación
        // Pero en el código actual, no se hace nada con esta información
      });
    }
  );
}

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getValueLead;
