const postInfoPago = require("../controllers/Pagos/postInfoPago");

// Actualizar información de pagos
const updatePagosInfoHandler = async (req, res) => {
  const info = req.body;
  // const objeto = {
  //   email: info.data.object.customer_details.email,
  //   monto: info.data.object.amount_total,
  //   status: info.data.object.status,
  // }

  try {
    const infoSave = await postInfoPago(info);
    res.status(200).json(infoSave);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { updatePagosInfoHandler };
