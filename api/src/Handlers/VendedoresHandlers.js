const getAllVendedores = require("../controllers/Vendedor/getAllVendedores");
const getVendedorById = require("../controllers/Vendedor/getVendedorById");
const getVendedorByName = require("../controllers/Vendedor/getVendedorByName");
const postVendedor = require("../controllers/Vendedor/postVendedor");
const updateVendedorById = require("../controllers/Vendedor/updateVendedorById");
const getVendedorByEmail = require("../controllers/Vendedor/getVendedorByEmail");
const getVendedorVentasByEmail = require("../controllers/Vendedor/getVendedorVentasByEmail");
const updateVendedorByEmail = require("../controllers/Vendedor/updateVendedorByEmail");

// Obtener todos los vendedores
const getAllVendedoresHandler = async (req, res) => {
  try {
    const vendedores = await getAllVendedores();
    res.status(200).json(vendedores);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nuevo vendedor
const postVendedorHandler = async (req, res) => {
  const data = req.body;

  try {
    const vendedor = await postVendedor(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar vendedor por ID
const updateVendedorHandler = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const vendedor = await updateVendedorById(id, updatedData);
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener vendedor por nombre
const getVendedorByNameHandler = async (req, res) => {
  const { Name } = req.query;

  try {
    const vendedor = await getVendedorByName(Name);
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener vendedor por email
const getVendedorByEmailHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const vendedor = await getVendedorByEmail(email);
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener ventas de un vendedor por email
const getVendedorVentasByEmailHandler = async (req, res) => {
  const body = req.body;
  try {
    const vendedor = await getVendedorVentasByEmail(body);
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener vendedor por ID
const getVendedorByIdHandler = async (req, res) => {
  const id = req.params.id;

  try {
    const vendedor = await getVendedorById(id);
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar vendedor por email
const updateVendedorByEmailHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const vendedor = await updateVendedorByEmail(email, updatedData);
    res.status(200).json(vendedor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllVendedoresHandler,
  postVendedorHandler,
  updateVendedorHandler,
  getVendedorByIdHandler,
  getVendedorByNameHandler,
  getVendedorByEmailHandler,
  getVendedorVentasByEmailHandler,
  updateVendedorByEmailHandler,
};
