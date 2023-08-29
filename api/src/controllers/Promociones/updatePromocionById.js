const Promociones = require("../../models/Promociones");

const updatePromocionById = async (id, body) => {
  const promociones = await Promociones.findByIdAndUpdate(
    id,
    { $set: { promocion: body } },
    { new: true }
  );

  return promociones;
};

module.exports = updatePromocionById;
