const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;

    console.log(desde);

    /*  const usuarios = await Usuario.find({}, 'nombre email google role')
                                     .skip(desde)
                                     .limit(5);
    
    const total = await Usuario.count(); */
    //Para ejecutar las dos a ka vez

    const[ usuarios, total ] = await Promise.all([
        Usuario
                .find({}, 'nombre email google role img')
                .skip(desde)
                .limit(5),
        Usuario
                .countDocuments()
    ]);
    res.json({
        ok: true,
        usuarios,
        total
    });


}

const crearUsuario = async (req, res) => {

    const { email, password } = req.body;


    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario
        await usuario.save();

        //Generar el token -JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario, 
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesparado... revisar log'
        });
    }
}

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        //Actualizaziones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        if ( !usuarioDB.google){
            campos.email = email;
        } else if ( usuarioDB.email != email ){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no puede cambiar el email'
            })
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesparado'
        });

    }
}


    const borrarUsuario = async (req, res = response) => {

        const uid = req.params.id;
    
        try {
            const usuarioDB = await Usuario.findById(uid);

            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un usuario por ese id'
                });
            }
            //Borrar usuario
            await Usuario.findByIdAndDelete( uid );

            res.json({
                ok: true,
                msg: 'usuario eliminado'
            });

        } catch (error) {

            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error inesparado... revisar log'
            });

        }

    }



module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario 
}