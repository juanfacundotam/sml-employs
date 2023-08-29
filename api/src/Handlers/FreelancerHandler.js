const getAllFreelancer = require("../controllers/Freelancer/getAllFreelancer");
const postFreelancer = require("../controllers/Freelancer/postFreelancer");
const getLeadChecked = require("../controllers/Freelancer/getLeadChecked");
const getAllFreelancers = require("../controllers/Freelancer/getAllFreelancer");
const updateFreelancerByEmail = require("../controllers/Freelancer/updateFreelancerByEmail");
const updateFreelancerById = require("../controllers/Freelancer/updateFreelancerById");

// Registrar nuevo freelancer
const postFreelancerHandler = async (req, res) => {
  const data = req.body;

  try {
    const freelancer = await postFreelancer(data);
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los freelancers
const getAllFreelancerHandler = async (req, res) => {
  try {
    const freelancers = await getAllFreelancer();
    res.status(200).json(freelancers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener lead verificado de freelancer
const getLeadCheckedFreelanceHandler = async (req, res) => {
  const body = req.body;
  try {
    const leadChecked = await getLeadChecked(body);
    res.status(200).json(leadChecked);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los freelancers por correo electrónico
const getAllFreelancersHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const freelancer = await getAllFreelancers(email);
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar freelancer por correo electrónico
const updateFreelancerByEmailHandler = async (req, res) => {
  const { email } = req.query;
  const updateData = req.body;
  try {
    const freelancer = await updateFreelancerByEmail(email, updateData);
    res.status(200).json(freelancer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar freelancer por ID
const updateFreelancerByIdHandler = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const corredores = await updateFreelancerById(id, updatedData);
    res.status(200).json(corredores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postFreelancerHandler,
  getAllFreelancerHandler,
  getLeadCheckedFreelanceHandler,
  getAllFreelancersHandler,
  updateFreelancerByEmailHandler,
  updateFreelancerByIdHandler,
};
