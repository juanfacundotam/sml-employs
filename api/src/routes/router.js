const { Router } = require("express");
const router = Router();
const CLevelRouter = require("./CLevelRouter");
const CorredorRouter = require("./CorredorRouter");
const LeadRouter = require("./LeadRouter");
const VendedorRouter = require("./VendedorRouter");
const EmployeesRouter = require("./EmployeesRouter");
const ClientesRouter = require("./ClientesRouter");
const LeaderRouter = require("./LeaderRouter");
const FreelancerRouter = require("./FreelancerRouter");
const PagosRouter = require("./PagosRouter");
const PromocionesRouter = require("./PromocionesRouter");

router.use("/employees", EmployeesRouter);
router.use("/clevel", CLevelRouter);
router.use("/corredor", CorredorRouter);
router.use("/lead", LeadRouter);
router.use("/leader", LeaderRouter);
router.use("/vendedor", VendedorRouter);
router.use("/clientes", ClientesRouter);
router.use("/pagos", PagosRouter);
router.use("/freelancer", FreelancerRouter);
router.use("/promociones", PromocionesRouter);

// ****************** Clientes ********************

// ****************** Clientes ********************

module.exports = router;
