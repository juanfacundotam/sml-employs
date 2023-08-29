const getAllCorredores = require("../controllers/Corredor/getAllCorredores");
const getCorredorById = require("../controllers/Corredor/getCorredorById");
const getCorredorByName = require("../controllers/Corredor/getCorredorByEmail");
const getValueLead = require("../controllers/Corredor/getValueLeads");
const postCorredor = require("../controllers/Corredor/postCorredor");
const putCorredorLead = require("../controllers/Corredor/putCorredorLead");
const updateCorredorById = require("../controllers/Corredor/updateCorredorById");
const getCorredorByEmail = require("../controllers/Corredor/getCorredorByEmail");
const putCorredorLeadChecked = require("../controllers/Corredor/putCorredorLeadChecked");
const updateCorredorByEmail = require("../controllers/Corredor/updateCorredorByEmail");

// Obtener todos los corredores
const getAllCorredoresHandler = async (req, res) => {
  try {
    const corredores = await getAllCorredores();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener valor de leads
const getValueLeadsHandler = async (req, res) => {
  try {
    const corredores = await getValueLead();
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Registrar nuevo corredor
const postCorredorHandler = async (req, res) => {
  const data = req.body;

  try {
    const corredores = await postCorredor(data);
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar leads no revisados del corredor
const putCorredorLeadHandler = async (req, res) => {
  const email = req.query.email;
  const leadUnchecked10 = req.body;

  try {
    const employ = await putCorredorLead(email, leadUnchecked10);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar leads revisados del corredor
const putCorredorLeadCheckedHandler = async (req, res) => {
  const email = req.query.email;
  const leadChecked = req.body;

  try {
    const employ = await putCorredorLeadChecked(email, leadChecked);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar información del corredor
const updateCorredorHandler = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const corredores = await updateCorredorById(id, updatedData);
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener corredor por correo electrónico
const getCorredorByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const leads = await getCorredorByEmail(email);
    res.status(200).json(leads);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener corredor por ID
const getCorredorByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const corredores = await getCorredorById(id);
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar información del corredor por correo electrónico
const updateCorredorByEmailHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const corredor = await updateCorredorByEmail(email, updatedData);
    res.status(200).json(corredor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllCorredoresHandler,
  postCorredorHandler,
  updateCorredorHandler,
  getCorredorByIdHandler,
  getCorredorByEmailHandler,
  putCorredorLeadHandler,
  getValueLeadsHandler,
  putCorredorLeadCheckedHandler,
  updateCorredorByEmailHandler,
};
