const mongoose = require("mongoose");
const validator = require("validator");

const CorredorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "El correo electrónico debe tener un formato válido",
      },
    },
    birthdate: {
      type: String,
    },
    photo: {
      type: String,
    },
    country: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    description: {
      type: String,
    },
    classifications: {
      type: String,
    },
    average_delay: {
      type: String,
    },
    incidences: {
      type: String,
    },
    hired_leads: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
    },
    leads: {
      type: Array,
      required: true,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


const Corredor = new mongoose.model("corredor", CorredorSchema);

module.exports = Corredor;
