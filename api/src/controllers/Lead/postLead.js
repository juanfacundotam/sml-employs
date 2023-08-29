// Importando el modelo Lead
const Lead = require("../../models/Lead");

// Función para agregar un lead a la base de datos
const postLead = async (data) => {
  // Utiliza el método 'map' para iterar sobre cada objeto en el array 'data'
  // y crea un nuevo registro de lead en la base de datos con los campos proporcionados en cada objeto
  // Utiliza el método 'create' para crear el nuevo registro de lead con los datos proporcionados
  // Devuelve una Promesa que resuelve cuando todos los registros de lead han sido creados
  const client = await Promise.all(
    data.map(
      ({
        city,
        province,
        name,
        category,
        email,
        telephone,
        url,
        country,
        profesion,
        marca_personal,
        description,
        speech,
        monto_op,
        fecha_op,
        checked,
        view,
        corredor,
        vendedor,
        level,
        instagram,
        status,
        vendedor_id,
        corredor_id,
      }) => {
        return Lead.create({
          name: name,
          category: category,
          city: city,
          province: province,
          url: url ? url : "-",
          telephone: telephone ? telephone : "-",
          email: email ? email : "",
          instagram: instagram ? instagram : "",
          level: level ? level : "-",
          status: status ? status : "Sin contactar",
          statusoptions: "",
          vendedor_id: vendedor_id ? vendedor_id : "",
          corredor_id: corredor_id ? corredor_id : "",
          checked: checked ? checked : false,
          view: view ? view : false,
          country: country,
          profesion: profesion,
          marca_personal: marca_personal,
          description: description ? description : "",
          speech: speech ? speech : "",
          monto_op: monto_op ? monto_op : 0,
          fecha_op: fecha_op ? fecha_op : "",
          corredor: corredor ? corredor : "",
          vendedor: vendedor ? vendedor : "",
          deleted: false,
        });
      }
    )
  );

  return client; // Devuelve un array con los registros de lead creados en la base de datos
};

module.exports = postLead;
