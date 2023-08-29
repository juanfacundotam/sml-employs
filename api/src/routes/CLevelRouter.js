const { Router } = require("express");
const {
  postCLevelHandler,
  getCLevelByIdHandler,
  getCLevelByNameHandler,
  getAllCLevelsHandler,
  getCLevelByEmailHandler,
  updateClevelByEmailHandler,
} = require("../Handlers/cLevelHandlers");
const CLevelRouter = Router();

CLevelRouter.post("/", postCLevelHandler);
CLevelRouter.get("/", getAllCLevelsHandler);
CLevelRouter.get("/email", getCLevelByEmailHandler);
CLevelRouter.get("/name", getCLevelByNameHandler);
CLevelRouter.get("/:id", getCLevelByIdHandler);
CLevelRouter.put("/email", updateClevelByEmailHandler);

module.exports = CLevelRouter;
