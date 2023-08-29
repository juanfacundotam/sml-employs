// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para obtener todos los leads según los criterios de clasificación
const getAllLeadClasificacion = async (query) => {
  let leadUnchecked = []; // Array para almacenar los leads no verificados
  let limitedLeadRest = []; // Array para almacenar otros leads limitados (actualmente vacío)

  // Extrayendo los parámetros de consulta del objeto 'query'
  const {
    email,
    names,
    profesion,
    country,
    category,
    marca_personal,
    freelancer,
  } = query;

  // Función para encontrar leads no verificados basados en las condiciones y el límite proporcionados
  const findLeadUnchecked = async (conditions, limit) => {
    return Lead.find(conditions, null, { limit }).lean(); // Obtiene leads no verificados con un límite dado
  };

  // Verificando si el parámetro 'freelancer' está configurado como 'undefined'
  if (freelancer === "undefined") {
    // Si los parámetros 'profesion', 'country', 'category' y 'marca_personal' no están proporcionados
    if (!profesion && !country && !category && !marca_personal) {
      // Obtiene leads no verificados para 'corredor' (agente) con 'checked' en 'false', límite de 10
      leadUnchecked = await findLeadUnchecked(
        {
          corredor: email,
          checked: false,
        },
        10 // Limita los resultados a 10
      );
    } else {
      // Crea patrones de expresiones regulares para los criterios de búsqueda opcionales
      const countryRegex = country ? new RegExp(country, "i") : /.*/;
      const profesionRegex = profesion ? new RegExp(profesion, "i") : /.*/;
      const categoryRegex = category ? new RegExp(category, "i") : /.*/;
      const marca_personalRegex = marca_personal
        ? new RegExp(marca_personal, "i")
        : /.*/;

      // Obtiene leads no verificados para 'corredor' (agente) con 'checked' en 'false' y criterios de búsqueda opcionales, límite de 10
      leadUnchecked = await findLeadUnchecked(
        {
          corredor: email,
          checked: false,
          country: countryRegex,
          profesion: profesionRegex,
          category: categoryRegex,
          marca_personal: marca_personalRegex,
        },
        10 // Limita los resultados a 10
      );
    }
  } else {
    // Si el parámetro 'freelancer' está proporcionado (no es 'undefined')
    if (!profesion && !country && !category && !marca_personal) {
      // Obtiene leads no verificados para 'from' (remitente) con 'checked' en 'false', límite de 10
      leadUnchecked = await findLeadUnchecked(
        {
          from: email,
          checked: false,
        },
        10 // Limita los resultados a 10
      );
    } else {
      // Crea patrones de expresiones regulares para los criterios de búsqueda opcionales
      const countryRegex = country ? new RegExp(country, "i") : /.*/;
      const profesionRegex = profesion ? new RegExp(profesion, "i") : /.*/;
      const categoryRegex = category ? new RegExp(category, "i") : /.*/;
      const marca_personalRegex = marca_personal
        ? new RegExp(marca_personal, "i")
        : /.*/;

      // Obtiene leads no verificados para 'from' (remitente) con 'checked' en 'false' y criterios de búsqueda opcionales, límite de 10
      leadUnchecked = await findLeadUnchecked(
        {
          from: email,
          checked: false,
          country: countryRegex,
          profesion: profesionRegex,
          category: categoryRegex,
          marca_personal: marca_personalRegex,
        },
        10 // Limita los resultados a 10
      );
    }
  }

  // Combinando los leads no verificados y otros leads adicionales limitados, y devolviendo el resultado
  return [...leadUnchecked, ...limitedLeadRest];
};

module.exports = getAllLeadClasificacion;
