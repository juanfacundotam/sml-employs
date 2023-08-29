// Importando los modelos Lead y Vendedor
const Lead = require("../../models/Lead");
const Vendedor = require("../../models/Vendedor");

// Función para obtener un lead y la información del vendedor asociado por su ID
const getLeadVendedorById = async (id) => {
  // Utiliza el método 'findOne' para buscar un registro de lead en la colección 'Lead'
  // donde el campo '_id' es igual al valor de 'id' proporcionado
  const leadResult = await Lead.findOne({ _id: id });

  // Utiliza el método 'findOne' para buscar un registro de vendedor en la colección 'Vendedor'
  // donde el campo 'email' es igual al valor del campo 'vendedor' del lead encontrado
  const vendedor = await Vendedor.findOne({ email: leadResult.vendedor });

  // Crea un objeto 'data' que contiene la información del lead encontrado y la información del vendedor asociado
  const data = {
    lead: leadResult,
    Vendedor_Name: {
      name: vendedor.name,
      email: vendedor.email,
      _id: vendedor._id,
    },
  };

  return data; // Devuelve el objeto 'data' con la información del lead y del vendedor asociado
};

module.exports = getLeadVendedorById;
