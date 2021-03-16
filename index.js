
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
const e = require('express');
require('dotenv').config();

//crear servidor de express

const app = express();

// CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));

//Lanzar la aplicacion

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + 3000 );
})