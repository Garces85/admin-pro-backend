/* Path: 'api/login */

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post( '/', 
[
    check('email', 'Email obligatorio').isEmail(),
    check('password', 'Contraseña obligatorio').not().isEmpty(),
    validarCampos
] ,
login );

router.post( '/google', 
[
    check('token', 'Token de Google es  obligatorio').not().isEmpty(),
    validarCampos
] ,
googleSignIn );

module.exports = router;