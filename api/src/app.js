// Importamos las dependencias necesarias para el servidor Express
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/router.js");
const cors = require("cors");
const path = require("path");

// Importamos la configuración de la base de datos desde "./db.js"
require("./db.js");

// Creamos una instancia de Express y la asignamos a la variable "server"
const server = express();

// Definimos el nombre del servidor como "API"
server.name = "API";

// Configuramos el servidor para utilizar CORS y otros middleware
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Configuramos las cabeceras de CORS para permitir solicitudes desde cualquier origen
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Definimos las rutas para la API en "/api" utilizando las rutas definidas en "./routes/router.js"
server.use("/api", routes);

// Servimos los archivos estáticos del cliente web (en la carpeta "dist" del cliente) en el directorio raíz
server.use(express.static(path.join(__dirname, "..", "client", "dist")));

// Para cualquier otra ruta no definida en la API, servimos el archivo "index.html" del cliente web
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "dist", "index.html"));
});

// Middleware para capturar errores y devolver una respuesta adecuada
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Exportamos la instancia de Express (servidor) para que pueda ser utilizada en otros archivos
module.exports = server;
