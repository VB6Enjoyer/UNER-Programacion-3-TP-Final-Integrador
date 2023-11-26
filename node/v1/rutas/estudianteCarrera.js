const { Router } = require('express');
const { inscripcionMateria, buscarTodos, buscarPorId, crear, eliminar } = require('../../controladores/estudianteCarrera');

const router = Router();

router.post('/estudiantesCarreras/', crear)
router.get('/estudiantesCarreras/', buscarTodos)
router.delete('/estudiantesCarreras/:idEstudianteCarrera', eliminar);
router.get('/estudiantesCarreras/:idEstudianteCarrera', buscarPorId);

module.exports= router;
