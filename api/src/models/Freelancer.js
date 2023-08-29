const mongoose = require("mongoose");
const validator = require("validator");

const FreelancerSchema = new mongoose.Schema(
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
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    rol: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      default: "",
    },
  },
  { timestamps: true }
);

const Freelancer = new mongoose.model("freelancer", FreelancerSchema);

module.exports = Freelancer;
