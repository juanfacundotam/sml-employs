const getAllCLevels = require("../controllers/CLevel/getAllCLevels");
const getCLevelById = require("../controllers/CLevel/getCLevelById");
const getCLevelByName = require("../controllers/CLevel/getCLevelByName");
const getClevelByEmail = require("../controllers/CLevel/getClevelByEmail");
const postCLevel = require("../controllers/CLevel/postCLevel");
const updateCLevelByEmail = require("../controllers/CLevel/updateCLevelByEmail");

// Obtener todos los niveles CLevel
const getAllCLevelsHandler = async (req, res) => {
  try {
    const cLevels = await getAllCLevels();
    res.status(200).json(cLevels);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Publicar un nivel CLevel
const postCLevelHandler = async (req, res) => {
  const data = req.body;
  try {
    const cLevel = await postCLevel(data);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar nivel CLevel por correo electrónico
const updateClevelByEmailHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const employ = await updateCLevelByEmail(email, updatedData);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener CLevel por correo electrónico
const getCLevelByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const cLevel = await getClevelByEmail(email);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener CLevel por nombre
const getCLevelByNameHandler = async (req, res) => {
  const { Name } = req.query;

  try {
    const cLevel = await getCLevelByName(Name);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener CLevel por ID
const getCLevelByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const cLevel = await getCLevelById(id);
    res.status(200).json(cLevel);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllCLevelsHandler,
  postCLevelHandler,
  updateClevelByEmailHandler,
  getCLevelByIdHandler,
  getCLevelByNameHandler,
  getCLevelByEmailHandler,
};
