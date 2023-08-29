// Importamos el modelo de Freelancer desde la ruta relativa "../../models/Freelancer"
const Freelancer = require("../../models/Freelancer");
const Lead = require("../../models/Lead");

// Función asincrónica para actualizar los datos de un freelancer por su dirección de correo electrónico (email)
const updateFreelancerByEmail = async (email, updatedData) => {
  // Buscamos al freelancer por su email y actualizamos sus campos con los valores proporcionados en el objeto "updatedData"
  // Utilizamos { new: true } para que se devuelva el freelancer actualizado después de realizar la actualización


  const lead = await Lead.updateMany(
    {
      corredor: email,
      vendedor: email,
      freelancer: true,
      checked: false,
    },
    {
      $set: {
        vendedor: "",
        vendedor_name: "",
        corredor: "",
        corredor_name: "",
        freelancer: false,
        view: false,
      },
    }
  );

  const lead2 = await Lead.updateMany(
    {
      corredor: email,
      vendedor: email,
      freelancer: true,
      checked: true,
      status: "Sin contactar"
    },
    {
      $set: {
        vendedor: "",
        vendedor_name: "",
        freelancer: false,
      },
    }
  );

  // const lead3 = await Lead.updateMany(
  //   {
  //     corredor: email,
  //     vendedor: email,
  //     freelancer: true,
  //     checked: true,
  //     status: { $ne: "Sin contactar" }
  //   },
  //   {
  //     $set: {
  //       freelancer: false,

  //     },
  //   }
  // );


  // const Lead = await Lead.find({ corredor: email, vendedor: email, freelancer: true }, updatedData, {
  //   new: true,
  // });

  const freelancer = await Freelancer.findOneAndUpdate({ email }, {updatedData});

  return freelancer; // Devolvemos el freelancer actualizado con los cambios realizados
};

// Exportamos la función para que pueda ser utilizada en otros archivos
module.exports = updateFreelancerByEmail;
