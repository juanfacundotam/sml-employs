require('dotenv').config();

const mongoose = require('mongoose');

const { URI } = process.env;
const DB_URI = URI;

mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('********* CONEXIÓN CORRECTA *******');
	})
	.catch((err) => {
		console.log('********* ERROR DE CONEXIÓN *******');
		console.error(err);
	});
