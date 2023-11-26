const { Router } = require('express');

const { buscarPorId, buscarTodos, eliminar, crear, actualizar } = require('../../controladores/materia');

const router = Router();

router.post('/materias', crear);
router.delete('/materias/:idMateria', eliminar);
router.put('/materias/:idMateria', actualizar);
router.get('/materias', buscarTodos);
router.get('/materias/:idMateria', buscarPorId);

module.exports = router
