const { Router } = require("express");
const {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
  updateClientProfileHandler,
  getClientByEmailHandler,
  paymentClienteHandler,
  paymentClienteVendedoresHandler,
  paymentCompletedClienteHandler,
  setReferredHandler,
  addVideosHandler,
} = require("../Handlers/ClientesHandlers");
const ClientesRouter = Router();


ClientesRouter.post("/new", newClientHandler);
ClientesRouter.get("/username", loginClientHandler);
ClientesRouter.get("/user", getClientByEmailHandler);
ClientesRouter.get("/", getAllClientesHandler);
ClientesRouter.put("/update", updateClientProfileHandler);
ClientesRouter.post("/payment", paymentClienteHandler);
ClientesRouter.post("/pagos-sml", paymentClienteVendedoresHandler);
ClientesRouter.post("/payment_completed", paymentCompletedClienteHandler);
ClientesRouter.put("/referred", setReferredHandler);
ClientesRouter.put("/addvideo", addVideosHandler);

module.exports = ClientesRouter;
