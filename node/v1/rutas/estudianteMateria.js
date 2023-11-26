const { Router } = require('express');
const { inscripcionMateria, buscarTodos, buscarPorId, crear, eliminar } = require('../../controladores/estudianteMateria');

const router = Router();

router.post('/estudiantesMaterias/', crear)
router.get('/estudiantesMaterias/', buscarTodos)
router.delete('/estudiantesMaterias/:idEstudianteMateria', eliminar);
router.get('/estudiantesMaterias/:idEstudianteMateria', buscarPorId);

module.exports= router;
