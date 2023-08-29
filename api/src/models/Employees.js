const { Schema, model } = require("mongoose");
const validator = require("validator");

const employeesSchema = new Schema(
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
    rol: {
      type: String,
      required: true,
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
    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  { timestamps: true }
);

const Employees = model("Employees", employeesSchema);

module.exports = Employees;
