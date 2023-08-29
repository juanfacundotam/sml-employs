// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener hasta 10 leads no verificados según los criterios de búsqueda proporcionados
const getLead10Unchecked = async (query) => {
  let leadUnchecked = []; // Array para almacenar los leads no verificados
  let limitedLeadRest = []; // Array para almacenar otros leads limitados
  let leadRest = []; // Array (actualmente no se utiliza)

  // Extrayendo los parámetros de búsqueda del objeto 'query'
  const { email, names, profesion, country, category, marca_personal } = query;

  // Función para encontrar leads no verificados basados en las condiciones y el límite proporcionados
  const findLeadUnchecked = async (conditions, limit) => {
    return Lead.find(conditions, null, { limit }).lean(); // Obtiene leads no verificados con un límite dado
  };

  // Función para actualizar los leads no verificados con ciertas condiciones
  const updateLeadRest = async (conditions, updates) => {
    return Lead.updateMany(conditions, updates); // Actualiza los registros de la colección 'Lead' con los valores proporcionados
  };

  // Si no se proporcionan los parámetros de búsqueda (profesion, country, category, marca_personal)
  if (!profesion && !country && !category && !marca_personal) {
    // Obtiene hasta 10 leads no verificados para 'corredor' (agent) con ciertos criterios
    leadUnchecked = await findLeadUnchecked(
      {
        corredor: email,
        checked: false,
        freelancer: false,
        view: true,
      },
      10 // Limita los resultados a un máximo de 10
    );

    // Calcula cuántos leads más son necesarios para completar los 10
    const count = 10 - leadUnchecked.length;
    if (count > 0) {
      // Obtiene leads no verificados adicionales para completar los 10
      limitedLeadRest = await findLeadUnchecked(
        {
          checked: false,
          view: false,
          corredor: "",
          freelancer: false,
        },
        count // Limita los resultados para completar los 10
      );

      // Si se encontraron leads adicionales, se actualizan con ciertos valores
      if (limitedLeadRest.length > 0) {
        const updates = limitedLeadRest.map((element) => ({
          updateOne: {
            filter: { _id: element._id },
            update: { corredor: email, corredor_name: names, view: true },
          },
        }));

        await Lead.bulkWrite(updates); // Ejecuta las actualizaciones en la base de datos
      }
    }
  } else {
    // Si se proporcionan los parámetros de búsqueda, se actualizan los leads no verificados con ciertas condiciones
    await updateLeadRest(
      {
        corredor: email,
        checked: false,
        freelancer: false,
      },
      {
        $set: {
          level: "",
          status: "Sin contactar",
          status_op: "",
          llamados: 0,
          vendedor: "",
          vendedor_name: "",
          corredor: "",
          corredor_name: "",
          checked: false,
          view: false,
          deleted: false,
          instagram: "",
        },
      }
    );

    // Se crean patrones de expresiones regulares para los parámetros de búsqueda
    const countryRegex = country ? new RegExp(country, "i") : /.*/;
    const profesionRegex = profesion ? new RegExp(profesion, "i") : /.*/;
    const categoryRegex = category ? new RegExp(category, "i") : /.*/;
    const marca_personalRegex = marca_personal
      ? new RegExp(marca_personal, "i")
      : /.*/;

    // Obtiene hasta 10 leads no verificados con los parámetros de búsqueda y ciertos criterios
    leadUnchecked = await findLeadUnchecked(
      {
        corredor: email,
        checked: false,
        view: true,
        freelancer: false,
        country: countryRegex,
        profesion: profesionRegex,
        category: categoryRegex,
        marca_personal: marca_personalRegex,
      },
      10 // Limita los resultados a un máximo de 10
    );

    // Calcula cuántos leads más son necesarios para completar los 10
    const count = 10 - leadUnchecked.length;
    if (count > 0) {
      // Obtiene leads no verificados adicionales para completar los 10
      limitedLeadRest = await findLeadUnchecked(
        {
          checked: false,
          view: false,
          corredor: "",
          freelancer: false,
          country: countryRegex,
          profesion: profesionRegex,
          category: categoryRegex,
          marca_personal: marca_personalRegex,
        },
        count // Limita los resultados para completar los 10
      );

      // Si se encontraron leads adicionales, se actualizan con ciertos valores
      if (limitedLeadRest.length > 0) {
        const updates = limitedLeadRest.map((element) => ({
          updateOne: {
            filter: { _id: element._id },
            update: {
              corredor: email,
              corredor_name: names,
              view: true,
              freelancer: false,
            },
          },
        }));

        await Lead.bulkWrite(updates); // Ejecuta las actualizaciones en la base de datos
      }
    }
  }

  return [...leadUnchecked, ...limitedLeadRest]; // Combina los leads obtenidos y los leads limitados adicionales y devuelve el resultado
};

module.exports = getLead10Unchecked;
