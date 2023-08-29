// Importar el modelo Lead desde la ruta especificada
const Lead = require("../../models/Lead");

// Función para asignar clientes potenciales a un freelancer
const asignacionFreelancer = async (data) => {
  // Extraer datos del objeto de entrada
  const { name, email, leads } = data;

  // Verificar si 'leads' es un número y luego convertirlo a un entero
  const parsedLeads = parseInt(leads, 10);

  // Verificar si parsedLeads es un entero válido
  if (isNaN(parsedLeads) || !Number.isInteger(parsedLeads)) {
    throw new Error("El valor de leads debe ser un número entero");
    // Lanzar un error si parsedLeads no es un entero válido
  }

  // Obtener las distintas profesiones de la colección Lead
  const profesiones = await Lead.distinct("profesion");

  // Arreglo para almacenar los clientes potenciales asignados
  const asignaciones = [];

  // Recorrer el número de clientes potenciales (parsedLeads)
  for (let i = 0; i < parsedLeads; i++) {
    // Obtener la i-ésima profesión del arreglo 'profesiones'
    const profesion = profesiones[i];

    // Buscar y actualizar un cliente potencial que cumpla ciertos criterios
    const lead = await Lead.findOneAndUpdate(
      {
        profesion,
        checked: false,
        freelancer: false,
        corredor: "",
        status: "Sin contactar",
      },
      {
        $set: {
          vendedor: email,
          vendedor_name: name,
          corredor: email,
          corredor_name: name,
          freelancer: true,
          checked: false,
        },
      },
      { new: true }
    );

    // Agregar el cliente potencial al arreglo 'asignaciones'
    asignaciones.push(lead);
  }

  // Filtrar cualquier cliente potencial nulo del arreglo 'asignaciones' y devolver el resultado
  return asignaciones.filter((lead) => lead !== null);
};

// Exportar la función 'asignacionFreelancer' para su uso externo
module.exports = asignacionFreelancer;
