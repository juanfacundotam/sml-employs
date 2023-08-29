const Corredor = require("../../models/Corredor");

const getCorredorByEmail = async (email) => {
  const corredor = await Corredor.findOne({ email: email });
  return corredor;
};

module.exports = getCorredorByEmail;
