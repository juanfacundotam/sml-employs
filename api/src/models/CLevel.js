const mongoose = require("mongoose");
const validator = require("validator");

const CLevelSchema = new mongoose.Schema(
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
    rol: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


const CLevel = new mongoose.model("clevel", CLevelSchema);

module.exports = CLevel;
