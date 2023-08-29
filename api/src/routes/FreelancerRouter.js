const { Router } = require("express");
const {
  postFreelancerHandler,
  getAllFreelancerHandler,
  getLeadCheckedFreelanceHandler,
  getAllFreelancersHandler,
  updateFreelancerByEmailHandler,
  updateFreelancerByIdHandler,
} = require("../Handlers/FreelancerHandler");

const FreelancerRouter = Router();

FreelancerRouter.post("/", postFreelancerHandler);
FreelancerRouter.get("/", getAllFreelancerHandler);
FreelancerRouter.get("/one", getAllFreelancersHandler);
FreelancerRouter.put("/checkedfreelance", getLeadCheckedFreelanceHandler);
FreelancerRouter.put("/email/email", updateFreelancerByEmailHandler);
FreelancerRouter.put("/:id", updateFreelancerByIdHandler);

module.exports = FreelancerRouter;
