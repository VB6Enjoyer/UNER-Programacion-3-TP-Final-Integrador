const Router = require('express');

const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require('../../controladores/carrera');

const router = Router();

router.post('/carreras', crear);
router.delete('/carreras/:idCarrera', eliminar);
router.put('/carreras/:idCarrera', actualizar);
router.get('/carreras', buscarTodos);
router.get('/carreras/:idCarrera', buscarPorId);

module.exports = router