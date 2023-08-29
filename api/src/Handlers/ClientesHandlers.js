const newClient = require("../controllers/Clientes/newClient");
const loginClient = require("../controllers/Clientes/loginClient");
const getAllClientes = require("../controllers/Clientes/getAllClients");
const updateClientProfile = require("../controllers/Clientes/updateClientProfile");
const getClientByEmail = require("../controllers/Clientes/getClientByEmail");
const createPayment = require("../controllers/Clientes/createPayment");
const createPaymentVendedor = require("../controllers/Clientes/createPaymentVendedor");
const setReferred = require("../controllers/Clientes/setReferred");
const addVideos = require("../controllers/Clientes/addVideos");

// Nuevo cliente
const newClientHandler = async (req, res) => {
  const body = req.body;
  try {
    const client = await newClient(body);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Iniciar sesión del cliente
const loginClientHandler = async (req, res) => {
  const { username } = req.query;
  try {
    const client = await loginClient(username);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener todos los clientes
const getAllClientesHandler = async (req, res) => {
  try {
    const client = await getAllClientes();
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar perfil de cliente
const updateClientProfileHandler = async (req, res) => {
  const { email } = req.query;
  const body = req.body;
  try {
    const client = await updateClientProfile(email, body);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener cliente por correo electrónico
const getClientByEmailHandler = async (req, res) => {
  const { email } = req.query;
  try {
    const client = await getClientByEmail(email);
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Realizar pago para cliente
const paymentClienteHandler = async (req, res) => {
  // const { id, name, monto, cuotas, cuotasRestantes, valorCuota } = req.body;
  // const { id, amount} = req.body;
  const { token, plan } = req.body;
  // const { id, monto } = req.body;

  try {
    const pago = await createPayment({
      token,
      plan,
      // id,
      // name,
      // amount,
      // cuotas,
      // cuotasRestantes,
      // valorCuota,
    });
    res.status(200).json(pago);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Realizar pago para cliente vendedor
const paymentClienteVendedoresHandler = async (req, res) => {
  const { id, name, monto, cuotas, cuotasRestantes, valorCuota, link, email } =
    req.body;
  try {
    const pago = await createPaymentVendedor({
      id,
      name,
      monto,
      cuotas,
      cuotasRestantes,
      valorCuota,
      link,
      email,
    });
    res.status(200).json(pago);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Manejar pago completado para cliente (comentado por el momento)
const paymentCompletedClienteHandler = async (req, res) => {
  // const event = req.body;
  // const paymentSessionId = req.body.data.object.id;
  // try {
  //   const pago = await createPaymentCompleted({ id, name, monto, cuotas, cuotasRestantes, valorCuota });
  //   res.status(200).json(pago);
  // } catch (error) {
  //   res.status(404).json({ message: error.message });
  // }
};

// Establecer referido para cliente
const setReferredHandler = async (req, res) => {
  const body = req.body;
  try {
    const referred = await setReferred(body);
    res.status(200).json(referred);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Agregar videos para cliente
const addVideosHandler = async (req, res) => {
  const { videosPublicados } = req.body;
  const { email } = req.query;
  try {
    const newVideo = await addVideos(email, videosPublicados);
    res.status(200).json(newVideo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  newClientHandler,
  loginClientHandler,
  getAllClientesHandler,
  updateClientProfileHandler,
  paymentCompletedClienteHandler,
  paymentClienteVendedoresHandler,
  getClientByEmailHandler,
  paymentClienteHandler,
  setReferredHandler,
  addVideosHandler,
};
