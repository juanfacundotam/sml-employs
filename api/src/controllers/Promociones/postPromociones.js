const Promociones = require("../../models/Promociones");

const postPromociones = async (body) => {
  const promocion = await Promociones.create({promocion: body});
  

  return promocion;
};
module.exports = postPromociones;
