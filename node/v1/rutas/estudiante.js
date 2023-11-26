const {Router} = require('express');
const { upload } = require('../../controladores/subirArchivo');

const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require('../../controladores/estudiante');

const router = Router();

router.post('/estudiantes',upload, crear);
router.delete('/estudiantes/:idEstudiante', eliminar);
router.put('/estudiantes/:idEstudiante', actualizar);
router.get('/estudiantes', buscarTodos);
router.get('/estudiantes/:idEstudiante', buscarPorId);


module.exports = router; 