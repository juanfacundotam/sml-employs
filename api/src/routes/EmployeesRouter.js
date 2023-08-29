const { Router } = require("express");
const {
  getAllEmployeesHandler,
  getEmployeesBannedHandler,
  postEmployeesHandler,
  getEmployeesByEmailHandler,
  deleteEmployeesByEmailHandler,
  updateEmployByEmailHandler,
  updateBannedEmployHandler,
} = require("../Handlers/EmployeesHandlers");

const EmployeesRouter = Router();

EmployeesRouter.get("/", getAllEmployeesHandler);
EmployeesRouter.get("/banned", getEmployeesBannedHandler);
EmployeesRouter.post("/", postEmployeesHandler);
EmployeesRouter.get("/email", getEmployeesByEmailHandler);
EmployeesRouter.delete("/", deleteEmployeesByEmailHandler);
EmployeesRouter.put("/email", updateEmployByEmailHandler);
EmployeesRouter.put("/banned", updateBannedEmployHandler);

module.exports = EmployeesRouter;
