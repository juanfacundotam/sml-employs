const getAllLeads = require("../controllers/Lead/getAllLeads");
const getLeadChecked = require("../controllers/Lead/getLeadChecked");
const getLeadById = require("../controllers/Lead/getLeadById");
const getLeadByName = require("../controllers/Lead/getLeadByName");
const putLeadByEmailApp = require("../controllers/Lead/putLeadByEmailApp");
const postLead = require("../controllers/Lead/postLead");
const updateLeadById = require("../controllers/Lead/updateLeadById");
const getLeadUnchecked = require("../controllers/Lead/getLeadUnchecked");
const getLeadCheckedInactive5 = require("../controllers/Lead/getLeadCheckedInactive5");
const getLead10Unchecked = require("../controllers/Lead/getLead10Unchecked");
const updateLeadVendedorById = require("../controllers/Lead/updateLeadVendedorById");
const updateLeadFreelanceById = require("../controllers/Lead/updateLeadFreelanceById");
const getLeadVendedorById = require("../controllers/Lead/getLeadVendedorById");
const getLeadCorredorChecked = require("../controllers/Lead/getLeadCorredoresChecked");
const limpiezaBaseFunction = require("../controllers/Lead/limpiezaBaseFunction");
const findLeadCorredorName = require("../controllers/Lead/findLeadCorredorName");
const findLeadVendedorName = require("../controllers/Lead/findLeadVendedorName");
const getAllProfession = require("../controllers/Lead/getAllProfesion");
const getAllProfessionFreelance = require("../controllers/Lead/getAllProfesionFreelance");
const getLeadByEmailApp = require("../controllers/Lead/getLeadByEmailApp");
const getAllCountry = require("../controllers/Lead/getAllCountry");
const getAllCountryFreelance = require("../controllers/Lead/getAllCountryFreelance");
const findLeadCorredorNameAllInfo = require("../controllers/Lead/findLeadCorredorNameAllInfo");
const getAllCategory = require("../controllers/Lead/getAllCategory");
const getCorredores = require("../controllers/Lead/getCorredores");
const changeLeadEmail = require("../controllers/Lead/changeLeadEmail");
const getVendedores = require("../controllers/Lead/getVendedores");
const findLeadVendedorNameAllInfo = require("../controllers/Lead/findLeadVendedorNameAllInfo");
const cleanValueClevel = require("../controllers/Lead/cleanValueClevel");
const getLeadDiscard = require("../controllers/Lead/getLeadDiscard");
const getAllLeadClasificacion = require("../controllers/Lead/getAllLeadClasificacion");
const dowloadCSV = require("../controllers/Lead/downloadCSV");
const findLeadFreelancerNameAllInfo = require("../controllers/Lead/findLeadFreelancerNameAllInfo");
const getLeadCheckedFreelancer = require("../controllers/Lead/getLeadCheckedFreelancer");
const getFreelancers = require("../controllers/Lead/getFreelancers");
const asignacionFreelancer = require("../controllers/Lead/asignacionFreelancer");
const findLeadFreelancerName = require("../controllers/Lead/findLeadFreelancerName");
const postLeadFreelancer = require("../controllers/Lead/postLeadFreelancer");
const getLeadCorredoresCheckedDescargados = require("../controllers/Lead/getLeadCorredoresCheckedDescargados");
const cambioNombreFreelancer = require("../controllers/Lead/cambioNombreFreelancer");
const cambioNombreCorredor = require("../controllers/Lead/cambioNombreCorredor");
const cambioNombreVendedor = require("../controllers/Lead/cambioNombreVendedor");
const cambioNombreClevel = require("../controllers/Lead/cambioNombreClevel");
const cambioNombreLeader = require("../controllers/Lead/cambioNombreLeader");
const UpdatePromociones = require("../controllers/Lead/UpdatePromociones");
const getAllLeadAPagar = require("../controllers/Lead/getAllLeadAPagar");
const setPagoLink = require("../controllers/Lead/setPagoLink");
const findLeadSeguimientoAllInfo = require("../controllers/Lead/findLeadSeguimientoAllInfo");

// Obtener todos los leads
const getAllLeadHandler = async (req, res) => {
  try {
    const lead = await getAllLeads();
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Obtener todos los leads
const getAllLeadAPagarHandler = async (req, res) => {
  try {
    const lead = await getAllLeadAPagar();
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todas las profesiones
const getAllProfesionHandler = async (req, res) => {
  try {
    const profesion = await getAllProfession();
    res.status(200).json(profesion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todas las profesiones de freelancers filtradas por email
const getAllProfesionFreelanceHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const profesion = await getAllProfessionFreelance(email);
    res.status(200).json(profesion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los corredores
const getCorredoresHandler = async (req, res) => {
  try {
    const corredores = await getCorredores();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los freelancers
const getFreelancersHandler = async (req, res) => {
  try {
    const corredores = await getFreelancers();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los vendedores
const getVendedoresHandler = async (req, res) => {
  try {
    const corredores = await getVendedores();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todas las categorías
const getAllCategoryHandler = async (req, res) => {
  try {
    const category = await getAllCategory();
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los países
const getAllCountriesHandler = async (req, res) => {
  try {
    const country = await getAllCountry();
    res.status(200).json(country);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los países para freelancers filtrados por email
const getAllCountriesFreelanceHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const country = await getAllCountryFreelance(email);
    res.status(200).json(country);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads no verificados
const getLeadUncheckedHandler = async (req, res) => {
  try {
    const leadUnchecked = await getLeadUnchecked();
    res.status(200).json(leadUnchecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener los primeros 10 leads no verificados
const getLead10UncheckedHandler = async (req, res) => {
  const { query } = req;
  try {
    const leadUnchecked = await getLead10Unchecked(query);
    res.status(200).json(leadUnchecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads por clasificación
const getLeadClasificacionHandler = async (req, res) => {
  const { query } = req;
  try {
    const leadClasificacion = await getAllLeadClasificacion(query);
    res.status(200).json(leadClasificacion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads verificados
const getLeadCheckedHandler = async (req, res) => {
  try {
    const leadChequed = await getLeadChecked();
    res.status(200).json(leadChequed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads verificados para freelancers
const getLeadCheckedFreelancerHandler = async (req, res) => {
  try {
    const leadChequed = await getLeadCheckedFreelancer();
    res.status(200).json(leadChequed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads descartados
const getLeadDiscardHandler = async (req, res) => {
  try {
    const leadChequed = await getLeadDiscard();
    res.status(200).json(leadChequed);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads verificados pero inactivos durante 5 días
const getLeadCheckedInactive5Handler = async (req, res) => {
  const body = req.body;

  try {
    const leadCheckedInactive5 = await getLeadCheckedInactive5(body);
    res.status(200).json(leadCheckedInactive5);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cambiar nombre de lead C-level
const cambioNombreClevelHandler = async (req, res) => {
  const body = req.body;

  try {
    const nombreClevel = await cambioNombreClevel(body);
    res.status(200).json(nombreClevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cambiar nombre de lead Leader
const cambioNombreLeaderHandler = async (req, res) => {
  const body = req.body;

  try {
    const nombreLeader = await cambioNombreLeader(body);
    res.status(200).json(nombreLeader);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cambiar nombre de lead Freelancer
const cambioNombreFreelancerHandler = async (req, res) => {
  const body = req.body;

  try {
    const nombreFreelancer = await cambioNombreFreelancer(body);
    res.status(200).json(nombreFreelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cambiar nombre de lead Corredor
const cambioNombreCorredorHandler = async (req, res) => {
  const body = req.body;

  try {
    const nombreCorredor = await cambioNombreCorredor(body);
    res.status(200).json(nombreCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Cambiar nombre de lead Vendedor
const cambioNombreVendedorHandler = async (req, res) => {
  const body = req.body;

  try {
    const nombreVendedor = await cambioNombreVendedor(body);
    res.status(200).json(nombreVendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Publicar un nuevo lead
const postLeadHandler = async (req, res) => {
  const data = req.body;
  try {
    const lead = await postLead(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Publicar un nuevo lead para freelancers
const postLeadFreelancerHandler = async (req, res) => {
  const data = req.body;
  try {
    const lead = await postLeadFreelancer(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar un lead existente
const updateLeadHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const lead = await updateLeadById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar un lead de vendedor existente
const updateLeadVendedorHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const lead = await updateLeadVendedorById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar un lead de freelancer existente
const updateLeadFreelanceHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    const lead = await updateLeadFreelanceById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener lead por nombre
const getLeadByNameHandler = async (req, res) => {
  const { Name } = req.query;

  try {
    const lead = await getLeadByName(Name);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Put lead por emailApp
const putLeadByEmailAppHandler = async (req, res) => {
  const { emailApp } = req.query;
  const dataStripe = req.body;
  try {
    const lead = await putLeadByEmailApp(emailApp, dataStripe);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener lead por ID
const getLeadByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const lead = await getLeadById(id);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener lead de vendedor por ID
const getLeadVendedorHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const lead = await getLeadVendedorById(id, updatedData);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads de corredor verificados filtrados por email
const getLeadCorredorCheckedHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const leadChecked = await getLeadCorredorChecked(email);
    res.status(200).json(leadChecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener leads de corredores verificados y descargados filtrados por email
const getLeadCorredoresCheckedDescargadosHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const leadChecked = await getLeadCorredoresCheckedDescargados(email);
    res.status(200).json(leadChecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener lead por email de aplicación
const getLeadByEmailAppHandler = async (req, res) => {
  const { emailApp } = req.query;
  try {
    const lead = await getLeadByEmailApp(emailApp);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const UpdatePromocionesHandler = async (req, res) => {
  const body = req.body;
  try {
    const lead = await UpdatePromociones(body);
    res.status(200).json(lead);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Buscar lead de corredor por nombre
const findLeadCorredorNameHandler = async (req, res) => {
  const { name, month, year, fromDay, toDay } = req.query;
  try {
    const foundCorredor = await findLeadCorredorName(
      name,
      month,
      year,
      fromDay,
      toDay
    );
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Buscar lead de freelancer por nombre
const findLeadFreelancerNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const foundCorredor = await findLeadFreelancerName(name);
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Buscar lead de corredor por nombre con toda la información
const findLeadCorredorNameAllInfoHandler = async (req, res) => {
  const {
    corredor,
    vendedor,
    fromDay,
    toDay,
    profesion,
    country,
    category,
    level,
    status,
    descargados,
  } = req.query;
  try {
    const foundCorredor = await findLeadCorredorNameAllInfo(
      corredor,
      vendedor,
      fromDay,
      toDay,
      profesion,
      country,
      category,
      level,
      status,
      descargados
    );
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Buscar lead por nombre con toda la información
const findLeadSeguimientoAllInfoHandler = async (req, res) => {
  const { corredor, vendedor, freelancer } = req.query;
  try {
    const foundCorredor = await findLeadSeguimientoAllInfo(
      corredor,
      vendedor,
      freelancer
    );
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Buscar lead de freelancer por nombre con toda la información
const findLeadFreelancerNameAllInfoHandler = async (req, res) => {
  const {
    freelancer,
    fromDay,
    toDay,
    profesion,
    country,
    category,
    level,
    status,
    checked,
    descargados,
  } = req.query;
  try {
    const foundFreelancer = await findLeadFreelancerNameAllInfo(
      freelancer,
      fromDay,
      toDay,
      profesion,
      country,
      category,
      level,
      status,
      checked,
      descargados
    );
    res.status(200).json(foundFreelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Buscar lead de vendedor por nombre con toda la información
const findLeadVendedorNameAllInfoHandler = async (req, res) => {
  const { email, fromDay, toDay, profesion, country, category, level, status } =
    req.query;
  try {
    const foundVendedor = await findLeadVendedorNameAllInfo(
      email,
      fromDay,
      toDay,
      profesion,
      country,
      category,
      level,
      status
    );
    res.status(200).json(foundVendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Buscar lead de vendedor por nombre
const findLeadVendedorNameHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const foundCorredor = await findLeadVendedorName(name);
    res.status(200).json(foundCorredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar el email de un lead
const updateChangeEmailHandler = async (req, res) => {
  const { id } = req.params;

  const keys = Object.keys(req.body);
  const newValue = Object.values(req.body);

  try {
    const leadEmailChanged = await changeLeadEmail(id, keys[0], newValue[0]);
    res.status(200).json(leadEmailChanged);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Actualizar el pago seleccionado
const setPagoHandler = async (req, res) => {
  const body = req.body;

  try {
    const leadUpdated = await setPagoLink(body);
    res.status(200).json(leadUpdated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Descargar archivo CSV
const dowloadCSVHandler = async (req, res) => {
  const niveles = req.query.nivel || [];
  try {
    const download = await dowloadCSV(niveles);
    res.status(200).json(download);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Limpiar el valor de C-level en un lead
const cleanValueClevelHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const clevel = await cleanValueClevel(email);
    res.status(200).json(clevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Realizar limpieza de la base de datos
const limpiezaBaseHandler = async (req, res) => {
  try {
    const clean = await limpiezaBaseFunction();
    res.status(200).json(clean);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Asignar un freelancer a un lead
const asignacionFreelancerHandler = async (req, res) => {
  const data = req.body;
  try {
    const asignacion = await asignacionFreelancer(data);
    res.status(200).json(asignacion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllLeadHandler,
  getAllLeadAPagarHandler,
  getLeadUncheckedHandler,
  getLeadCheckedHandler,
  getLeadCheckedInactive5Handler,
  postLeadHandler,
  updateLeadHandler,
  getLead10UncheckedHandler,
  getLeadByIdHandler,
  getLeadByNameHandler,
  updateLeadVendedorHandler,
  updateLeadFreelanceHandler,
  getLeadVendedorHandler,
  getLeadCorredorCheckedHandler,
  getLeadCorredoresCheckedDescargadosHandler,
  limpiezaBaseHandler,
  findLeadCorredorNameHandler,
  findLeadVendedorNameHandler,
  getAllProfesionHandler,
  getAllProfesionFreelanceHandler,
  getAllCountriesHandler,
  getAllCountriesFreelanceHandler,
  getAllCategoryHandler,
  findLeadCorredorNameAllInfoHandler,
  findLeadVendedorNameAllInfoHandler,
  getCorredoresHandler,
  updateChangeEmailHandler,
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
  cambioNombreFreelancerHandler,
  cambioNombreCorredorHandler,
  cambioNombreVendedorHandler,
  cambioNombreClevelHandler,
  cambioNombreLeaderHandler,
  UpdatePromocionesHandler,
  setPagoHandler,
  findLeadSeguimientoAllInfoHandler,
  putLeadByEmailAppHandler,
};
