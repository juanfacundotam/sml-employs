const Lead = require("../../models/Lead");

const getAllLeadAPagar = async () => {
  const leads = await Lead.find({ status: "A pagar" });
  return leads;
};

module.exports = getAllLeadAPagar;
