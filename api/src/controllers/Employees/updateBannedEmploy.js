// Importar el modelo Lead desde la ubicación correcta
const Lead = require("../../models/Lead");

// Importar el modelo Employees desde la ubicación correcta
const Employees = require("../../models/Employees");

// Definir una función asincrónica llamada updateBannedEmploy que actualizará un registro de Employees por correo electrónico y realizará otras actualizaciones en registros de Lead relacionados
const updateBannedEmploy = async (email, updatedData) => {
  // Actualizar registros de Lead relacionados con el empleado que se va a marcar como eliminado
  // Aquí se utiliza el método "updateMany" del modelo Lead para realizar múltiples actualizaciones en los registros que cumplan con la condición especificada
  const leads = await Lead.updateMany(
    {
      corredor: email,
      status: "Sin contactar",
      freelancer: true,
    },
    {
      $set: {
        level: "",
        status: "Sin contactar",
        status_op: "",
        llamados: 0,
        vendedor: "",
        vendedor_name: "",
        corredor: "",
        corredor_name: "",
        checked: false,
        view: false,
        deleted: false,
        freelancer: false,
      },
    }
  );

  // Actualizar el registro del empleado en la base de datos utilizando el método "findOneAndUpdate" del modelo Employees
  // El argumento { email } es una abreviatura de { email: email }, que busca un registro con el correo electrónico proporcionado
  // updatedData es un objeto que contiene los campos y valores que se deben actualizar en el registro encontrado
  // El tercer argumento { new: true } devuelve el registro actualizado en lugar del registro anterior a la actualización
  const employ = await Employees.findOneAndUpdate({ email }, updatedData, {
    new: true,
  });

  // Retornar el registro de empleado actualizado
  return employ;
};

// Exportar la función updateBannedEmploy para que esté disponible en otros módulos
module.exports = updateBannedEmploy;
