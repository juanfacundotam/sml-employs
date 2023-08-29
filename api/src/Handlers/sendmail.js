const sendGrid = require("@sendgrid/mail");
require("dotenv").config();
const { APIKEY } = process.env;

// Enviar correo electrónico genérico
const sendmail = async (req, res) => {
  try {
    const { clientName, recipientEmail, message } = req.body;

    sendGrid.setApiKey(APIKEY);

    const emailData = {
      to: recipientEmail,
      from: "voeffray.jonathan@gmail.com",
      subject: "Incidencia detectada",
      text: message,
    };

    await sendGrid.send(emailData);

    res
      .status(200)
      .json({ message: "Correo electrónico enviado correctamente" });
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
    res.status(500).json({ error: error.message });
  }
};

// Enviar correo electrónico de contratación
const sendHiringEmail = async (req, res) => {
  try {
    const { clientName, recipientEmail } = req.body;

    sendGrid.setApiKey(APIKEY);

    const emailData = {
      to: recipientEmail,
      from: "voeffray.jonathan@gmail.com",
      subject: "¡Bienvenido a nuestra empresa!",
      text: `Hola ${clientName}, te damos la bienvenida a nuestra empresa. ¡Esperamos que tengas una gran experiencia trabajando con nosotros!, tu mail para ingresar a la empresa es ${recipientEmail} y la contraseña es Hola1234$, la pagina de la empresa es https://sml-app-git-main-smlappadm.vercel.app/clevel`,
    };

    await sendGrid.send(emailData);

    res
      .status(200)
      .json({ message: "Correo electrónico enviado correctamente" });
  } catch (error) {
    console.log("Error al enviar el correo electrónico:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendmail,
  sendHiringEmail,
};
