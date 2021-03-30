const { response } = require('express');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response )=>{

    const { email, password } = req.body;

    try {
        //Verifcar email
        const usuarioDB = await usuario.findOne({email});
        if ( !usuarioDB ){
            return res.status(404). json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }
        //Verificar Contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);

        if ( !validPassword) {
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no es valida'
            })
        }

        //Generar el token -JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
        
    }
}

module.exports =
{
    login
}