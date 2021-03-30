const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async( req, res = response ) => {

     const googleToken = req.body.token;

   try {
        const { name, email, picture } =await googleVerify( googleToken );
        
 
        const usuarioDB = await Usuario.findOne({ email });
        console.log(usuarioDB +"hola");
         let usuario;
        
        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
         
        res.json({
            ok: true,
            token
        });

   } catch (error) {
         
    res.status(401).json({
        ok: false,
        msg: 'Token no es correcto',
    });
    }  
}
module.exports =
{
    login,
    googleSignIn
}