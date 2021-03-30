/* 
    Medicos
    '/api/Medicos'
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    crearMedico,
    borrarMedico,
    actualizarMedico,
} = require('../controllers/medicos')

const router = Router();

router.get('/', getMedicos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de medico obligatorio').not().isEmpty(),
        check('hospital', 'El es hopitalID debe ser correcto').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
    ], actualizarMedico);

router.delete('/:id',
    borrarMedico);

module.exports = router;