const Lead = require("../../models/Lead");

const getAllLeadContratando = async () => {
  const leads = await Lead.find({ status: "Contratando" });
  return leads;
};

module.exports = getAllLeadContratando;
