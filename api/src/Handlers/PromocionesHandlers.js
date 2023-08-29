const deletePromocionById = require("../controllers/Promociones/deletePromocionById");
const getAllPromociones = require("../controllers/Promociones/getAllPromociones");
const postPromociones = require("../controllers/Promociones/postPromociones");
const updatePromocionById = require("../controllers/Promociones/updatePromocionById");

// Obtener todos las promociones
const getAllPromocionesHandler = async (req, res) => {
  try {
    const promociones = await getAllPromociones();
    res.status(200).json(promociones);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Crear nueva promoción
const postPromocionesHandler = async (req, res) => {
  const body = req.body;
  try {
    const promociones = await postPromociones(body);
    res.status(200).json(promociones);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar promoción
const updatePromocionByIdHandler = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const promocion = await updatePromocionById(id, body);
    res.status(200).json(promocion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Eliminar promoción
const deletePromocionByIdHandler = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const promocion = await deletePromocionById(id, body);
    res.status(200).json(promocion);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getAllPromocionesHandler,
  postPromocionesHandler,
  updatePromocionByIdHandler,
  deletePromocionByIdHandler,
};
