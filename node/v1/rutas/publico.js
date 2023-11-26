const { Router } = require('express');
const { check } = require('express-validator');
const { enviarCorreo } = require('../../controladores/publico');
const { validarCampos } = require('../../middlewares/validarCampos');

const router = Router();


router.post('/contacto', [
    check('nombre', 'El nombre es requrido' ).not().isEmpty(),
    check('mensaje', 'El mensaje es requrido' ).not().isEmpty(),
    check('correo', 'El correo es requrido' ).isEmail(),
    validarCampos
], enviarCorreo); 

module.exports =  router
