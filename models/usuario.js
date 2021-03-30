const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false
    },
});


UsuarioSchema.method('toJSON', function(){
    /*Eliminamos el id*/
    const { __v, _id, password, ...object } = this.toObject();
    /*asignamos de nuevo el id pero cambiando en nombre*/
    object.uid = _id;
    return object;
});

module.exports = model( 'Usuario', UsuarioSchema );