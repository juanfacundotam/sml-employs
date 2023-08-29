// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para crear un nuevo cliente en la base de datos
const newClient = async ({
  username,
  name,
  email,
  password,
  photo,
  rol,
  referred,
}) => {
  // Creamos un nuevo cliente en la base de datos utilizando el modelo "Clientes"
  // Si alguno de los campos opcionales (username, name, password) no está definido (undefined), asignamos una cadena vacía ("") para evitar errores
  const client = await Clientes.create({
    username: username ?? "",
    name: name ?? "",
    email,
    photo,
    password: password ?? "",
    rol,
    deleted: false, // Establecemos el campo "deleted" como false por defecto
  });

  return client; // Devolvemos el cliente recién creado
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = newClient;
