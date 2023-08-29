// Importando el modelo Lead
const Lead = require("../../models/Lead");

const updateLeadById = async (id, updatedData) => {
  // Para actualizar la fecha del contratacion del lead
  if (updatedData.status === "Contratado") {
    const dateContratado = new Date();
    const formattedTimeContratado = dateContratado.toISOString();
    updatedData.updateContratado = formattedTimeContratado;
  }

  try {
    // Utiliza el método 'findByIdAndUpdate' para buscar y actualizar un registro de lead en la colección 'Lead'
    // donde el campo '_id' es igual al valor de 'id' proporcionado
    // 'updatedData' contiene los campos y valores a actualizar en el lead
    // 'new: true' indica que se debe devolver el lead actualizado después de la actualización
    const lead = await Lead.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return lead; // Devuelve el lead actualizado
  } catch (error) {
    // Si ocurre un error durante la actualización, se lanza una excepción con un mensaje de error
    throw new Error(`Error updating lead with id ${id}: ${error.message}`);
  }
};

module.exports = updateLeadById;
