
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//crear servidor de express

const app = express();

// CORS
app.use( cors() );

//Base de datos
dbConnection();

//Rutas
app.get( '/' ,(req, res) => {

    res.status(400).json.status({
        ok:true,
        msg: 'Hola Mundo'
    })
});


//Lanzar la aplicacion

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto' + 3000 );
})