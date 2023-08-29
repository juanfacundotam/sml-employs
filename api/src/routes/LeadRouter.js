const { Router } = require("express");
const {
  postLeadHandler,
  getAllLeadHandler,
  updateLeadHandler,
  getLeadByIdHandler,
  getLeadByNameHandler,
  getLeadCheckedHandler,
  getLeadUncheckedHandler,
  getLead10UncheckedHandler,
  getLeadCheckedInactive5Handler,
  updateLeadVendedorHandler,
  updateLeadFreelanceHandler,
  getLeadVendedorHandler,
  getLeadCorredorCheckedHandler,
  limpiezaBaseHandler,
  findLeadCorredorNameHandler,
  findLeadVendedorNameHandler,
  getAllProfesionHandler,
  getAllProfesionFreelanceHandler,
  getAllCountriesHandler,
  getAllCountriesFreelanceHandler,
  findLeadCorredorNameAllInfoHandler,
  getAllCategoryHandler,
  getCorredoresHandler,
  updateChangeEmailHandler,
  findLeadVendedorNameAllInfoHandler,
  getVendedoresHandler,
  cleanValueClevelHandler,
  getLeadByEmailAppHandler,
  getLeadDiscardHandler,
  getLeadClasificacionHandler,
  dowloadCSVHandler,
  findLeadFreelancerNameAllInfoHandler,
  getLeadCheckedFreelancerHandler,
  getFreelancersHandler,
  asignacionFreelancerHandler,
  findLeadFreelancerNameHandler,
  postLeadFreelancerHandler,
  getLeadCorredoresCheckedDescargadosHandler,
  cambioNombreFreelancerHandler,
  cambioNombreClevelHandler,
  cambioNombreLeaderHandler,
  cambioNombreVendedorHandler,
  cambioNombreCorredorHandler,
  UpdatePromocionesHandler,
  getAllLeadAPagarHandler,
  setPagoHandler,
  findLeadSeguimientoAllInfoHandler,
  putLeadByEmailAppHandler
} = require("../Handlers/LeadHandlers");
const LeadRouter = Router();

LeadRouter.get("/", getAllLeadHandler);
LeadRouter.get("/apagar", getAllLeadAPagarHandler);
LeadRouter.get("/profesion", getAllProfesionHandler);
LeadRouter.get("/profesionFreelance", getAllProfesionFreelanceHandler);
LeadRouter.get("/allcorredor", getCorredoresHandler);
LeadRouter.get("/allfreelancer", getFreelancersHandler);
LeadRouter.get("/allvendedor", getVendedoresHandler);
LeadRouter.get("/category", getAllCategoryHandler);
LeadRouter.get("/country", getAllCountriesHandler);
LeadRouter.get("/countryFreelance", getAllCountriesFreelanceHandler);
LeadRouter.get("/corredor", findLeadCorredorNameHandler);
LeadRouter.get("/freelancer", findLeadFreelancerNameHandler);
LeadRouter.get("/allinfo", findLeadCorredorNameAllInfoHandler);
LeadRouter.get("/allinfofreelancer", findLeadFreelancerNameAllInfoHandler);
LeadRouter.get("/allinfovendedor", findLeadVendedorNameAllInfoHandler);
LeadRouter.get("/vendedor", findLeadVendedorNameHandler);
LeadRouter.get("/leademailapp", getLeadByEmailAppHandler);
LeadRouter.get("/checked", getLeadCheckedHandler);
LeadRouter.get("/checkedfreelancer", getLeadCheckedFreelancerHandler);
LeadRouter.get("/checked/discard", getLeadDiscardHandler);
LeadRouter.get("/unchecked", getLeadUncheckedHandler);
LeadRouter.get("/unchecked10", getLead10UncheckedHandler);
LeadRouter.get("/clasificacion", getLeadClasificacionHandler);
LeadRouter.get("/corredorchecked", getLeadCorredorCheckedHandler);
LeadRouter.get(
  "/corredorcheckeddescargados",
  getLeadCorredoresCheckedDescargadosHandler
);
LeadRouter.get("/name", getLeadByNameHandler);
LeadRouter.get("/emailApp", getLeadByNameHandler);
LeadRouter.get("/seguimientofiltro", findLeadSeguimientoAllInfoHandler);
LeadRouter.get("/pagar");
LeadRouter.get("/:id", getLeadByIdHandler);
LeadRouter.get("/leadvendedor/:id", getLeadVendedorHandler);
LeadRouter.put("/emailapp", putLeadByEmailAppHandler);
LeadRouter.put("/changeemail/:id", updateChangeEmailHandler);
LeadRouter.put("/setpago", setPagoHandler);
LeadRouter.put("/cleanclevel", cleanValueClevelHandler);
LeadRouter.put("/limpieza", limpiezaBaseHandler);
LeadRouter.put("/checkedinactive5", getLeadCheckedInactive5Handler);
LeadRouter.put("/cambiarnombreclevel", cambioNombreClevelHandler);
LeadRouter.put("/cambiarnombreleader", cambioNombreLeaderHandler);
LeadRouter.put("/cambiarnombrevendedor", cambioNombreVendedorHandler);
LeadRouter.put("/cambiarnombrecorredor", cambioNombreCorredorHandler);
LeadRouter.put("/cambiarnombrefreelancer", cambioNombreFreelancerHandler);
LeadRouter.put("/asignacion", asignacionFreelancerHandler);
LeadRouter.put("/:id", updateLeadHandler);
LeadRouter.put("/vendedor/:id", updateLeadVendedorHandler);
LeadRouter.put("/freelance/:id", updateLeadFreelanceHandler);
LeadRouter.get("/download", dowloadCSVHandler);
LeadRouter.put("/promociones/promos", UpdatePromocionesHandler);
LeadRouter.post("/", postLeadHandler);
LeadRouter.post("/new", postLeadFreelancerHandler);

module.exports = LeadRouter;
