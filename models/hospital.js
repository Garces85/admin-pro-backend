const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'

    }
    /*Cambiar el nombre de la coleccion en Mongo*/
}, { collection: 'hospitales'});


HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    /*asignamos de nuevo el id pero cambiando en nombre*/
    return object;
});

module.exports = model( 'Hospital', HospitalSchema );