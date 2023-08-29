const mongoose = require("mongoose");

const PromocionesSchema = new mongoose.Schema(
  {
    promocion: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Promociones = new mongoose.model("promociones", PromocionesSchema);

module.exports = Promociones;
