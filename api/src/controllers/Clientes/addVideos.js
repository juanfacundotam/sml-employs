// Importamos el modelo de Clientes desde la ruta relativa "../../models/Clientes"
const Clientes = require("../../models/Clientes");

// Función asincrónica para agregar videos a un cliente dado su email y links de videos
const addVideos = async (email, linksVideos) => {
  // Buscamos un cliente que tenga el mismo email y el mismo link de video
  const linked = await Clientes.findOne({
    email: email,
    "videosPublicados.link": linksVideos.link,
  });

  // Si no encontramos un cliente con el mismo email y link de video
  if (!linked) {
    // Agregamos el link de video al array "videosPublicados" del cliente con el email proporcionado
    const newVideo = await Clientes.findOneAndUpdate(
      { email: email },
      { $addToSet: { videosPublicados: linksVideos } }, // $addToSet evita duplicados en el array
      { new: true } // Devuelve el cliente actualizado en lugar del cliente original
    );
    return newVideo; // Devolvemos el cliente con el nuevo video agregado
  }
  // Si el cliente ya tiene el mismo link de video, no hacemos nada y retornamos undefined
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = addVideos;
