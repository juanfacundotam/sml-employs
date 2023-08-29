const { Router } = require("express");
const {
  postVendedorHandler,
  getAllVendedoresHandler,
  getVendedorByNameHandler,
  getVendedorByIdHandler,
  updateVendedorHandler,
  getVendedorByEmailHandler,
  getVendedorVentasByEmailHandler,
  updateVendedorByEmailHandler,
} = require("../Handlers/VendedoresHandlers");
const VendedorRouter = Router();

VendedorRouter.post("/", postVendedorHandler);
VendedorRouter.get("/", getAllVendedoresHandler);
VendedorRouter.get("/name", getVendedorByNameHandler);
VendedorRouter.get("/email", getVendedorByEmailHandler);
VendedorRouter.put("/ventas/email", getVendedorVentasByEmailHandler);
VendedorRouter.get("/:id", getVendedorByIdHandler);
VendedorRouter.put("/:id", updateVendedorHandler);
VendedorRouter.put("/email/email", updateVendedorByEmailHandler);

module.exports = VendedorRouter;
