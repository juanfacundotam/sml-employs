const getAllLeaders = require("../controllers/Leader/getAllLeaders");
const getLeaderByEmail = require("../controllers/Leader/getLeaderByEmail");
const getLeaderById = require("../controllers/Leader/getLeaderById");
const getLeaderByName = require("../controllers/Leader/getLeaderByName");
const postLeader = require("../controllers/Leader/postLeader");
const updateLeaderById = require("../controllers/Leader/updateLeadById");
const updateLeaderByEmail = require("../controllers/Leader/updateLeaderByEmail");

// Obtener todos los líderes
const getAllLeadersHandler = async (req, res) => {
  try {
    const leaders = await getAllLeaders();
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Registrar nuevo líder
const postLeaderHandler = async (req, res) => {
  const data = req.body;
  try {
    const leaders = await postLeader(data);
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar líder por ID
const updateLeaderHandler = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const leaders = await updateLeaderById(id, updatedData);
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener líder por correo electrónico
const getLeaderByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const leaders = await getLeaderByEmail(email);
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener líder por nombre
const getLeaderByNameHandler = async (req, res) => {
  const { Name } = req.query;

  try {
    const leaders = await getLeaderByName(Name);
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener líder por ID
const getLeaderByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const leaders = await getLeaderById(id);
    res.status(200).json(leaders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar líder por correo electrónico
const updateLeaderByEmailHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const leader = await updateLeaderByEmail(email, updatedData);
    res.status(200).json(leader);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllLeadersHandler,
  postLeaderHandler,
  updateLeaderHandler,
  getLeaderByIdHandler,
  getLeaderByNameHandler,
  getLeaderByEmailHandler,
  updateLeaderByEmailHandler,
};
