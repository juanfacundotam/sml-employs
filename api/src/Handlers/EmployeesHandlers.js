const deleteEmployByEmail = require("../controllers/Employees/deleteEmployByEmail");
const getAllEmployees = require("../controllers/Employees/getAllEmployees");
const getEmployeesByEmail = require("../controllers/Employees/getEmployByEmail");
const getEmployeesBanned = require("../controllers/Employees/getEmployeesBanned");
const postEmployees = require("../controllers/Employees/postEmployees");
const updateBannedEmploy = require("../controllers/Employees/updateBannedEmploy");
const updateEmployByEmail = require("../controllers/Employees/updateEmployByEmail");

// Obtener todos los empleados
const getAllEmployeesHandler = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Registrar nuevo empleado
const postEmployeesHandler = async (req, res) => {
  const data = req.body;
  try {
    const Employees = await postEmployees(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener empleado por correo electrónico
const getEmployeesByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const employ = await getEmployeesByEmail(email);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Eliminar empleado por correo electrónico
const deleteEmployeesByEmailHandler = async (req, res) => {
  const { email } = req.query;

  try {
    const employ = await deleteEmployByEmail(email);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar empleado por correo electrónico
const updateEmployByEmailHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const employ = await updateEmployByEmail(email, updatedData);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Obtener empleados baneados
const getEmployeesBannedHandler = async (req, res) => {
  try {
    const employees = await getEmployeesBanned();
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar estado de empleado baneado por correo electrónico
const updateBannedEmployHandler = async (req, res) => {
  const email = req.query.email;
  const updatedData = req.body;

  try {
    const employ = await updateBannedEmploy(email, updatedData);
    res.status(200).json(employ);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postEmployeesHandler,
  getEmployeesByEmailHandler,
  updateEmployByEmailHandler,
  getAllEmployeesHandler,
  deleteEmployeesByEmailHandler,
  getEmployeesBannedHandler,
  updateBannedEmployHandler,
};
