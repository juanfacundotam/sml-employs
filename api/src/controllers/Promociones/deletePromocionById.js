const Promociones = require("../../models/Promociones");

const deletePromocionById = async (id) => {
  const promocionesEliminadas = await Promociones.findByIdAndDelete(id);

  return promocionesEliminadas;
};

module.exports = deletePromocionById;
