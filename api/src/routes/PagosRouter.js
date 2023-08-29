const { Router } = require("express");
const {
    updatePagosInfoHandler
} = require("../Handlers/PagosHandlers");

const PagosRouter = Router();


PagosRouter.post("/info", updatePagosInfoHandler);

module.exports = PagosRouter;