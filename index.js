
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

//Directorio Publico
    app.use( express.static('public'));

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/uploads', require('./routes/uploads'));

//Lanzar la aplicacion

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + 3000 );
})