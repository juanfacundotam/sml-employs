const { Router } = require("express");
const {
  getAllPromocionesHandler,
  postPromocionesHandler,
  updatePromocionByIdHandler,
  deletePromocionByIdHandler,
} = require("../Handlers/PromocionesHandlers");
const PromocionesRouter = Router();

PromocionesRouter.get("/", getAllPromocionesHandler);
PromocionesRouter.post("/", postPromocionesHandler);
PromocionesRouter.put("/:id", updatePromocionByIdHandler);
PromocionesRouter.delete("/:id", deletePromocionByIdHandler);

module.exports = PromocionesRouter;
