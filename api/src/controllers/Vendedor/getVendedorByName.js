// Importar el modelo de datos del Vendedor (probablemente un esquema de Mongoose)
const Vendedor = require("../../models/Vendedor");

// Función asincrónica para obtener vendedores por su nombre
const getVendedorByName = async (name) => {
  // Crear una expresión regular para buscar el nombre (ignorando mayúsculas y minúsculas)
  const regex = new RegExp(name, "i"); // 'i' indica que la búsqueda es insensible a mayúsculas y minúsculas

  // Buscar vendedores en la base de datos cuyo nombre coincida con la expresión regular
  const vendedor = await Vendedor.find({ name: { $regex: regex } });

  // Devolver el resultado de la consulta (todos los vendedores encontrados con el nombre buscado)
  return vendedor;
};

// Exportar la función para que pueda ser utilizada en otros módulos
module.exports = getVendedorByName;
