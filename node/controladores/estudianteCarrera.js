const estudianteCarreraBD = require('../baseDatos/estudianteCarreraBD');

buscarPorId = async(req, res) => {
    try{
        const idEstudianteCarrera = req.params.idEstudianteCarrera;   
        
        if(!idEstudianteCarrera) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const estudianteCarrera = await estudianteCarreraBD.buscarPorId(idEstudianteCarrera);

        res.json({estado:'OK', dato:estudianteCarrera});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) => {
    try{
        const estudiantesCarrera = await estudianteCarreraBD.buscarTodos();

        res.json({estado:'OK', dato:estudiantesCarrera});

    }catch (exec){
        throw exec;
    }
}

crear = async (req, res) => {
    const {estudiante, carrera, fechaAlta} = req.body;

    if(!estudiante || !carrera || !fechaAlta){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const estudianteCarrera = {
            estudiante:estudiante, 
            carrera:carrera, 
            fechaAlta:fechaAlta
        }; 

        try{
            const estudianteCarreraNuevo = await estudianteCarreraBD.crear(estudianteCarrera);
            res.status(201).json({estado:'OK', msj:'Inscripción a la carrera realizada', dato:estudianteCarreraNuevo});
        }catch(exec){
            throw exec;
        }
    }
}

eliminar = async (req, res) => {
    const idEstudianteCarrera = req.params.idEstudianteCarrera;

    if (!idEstudianteCarrera) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el ID de inscripción' });
    } else {
        try {
            await estudianteCarreraBD.eliminar(idEstudianteCarrera);
            res.status(200).json({ estado: 'OK', msj: 'Inscripción eliminada' });
        } catch (error) {
            res.status(500).json({ estado: 'FALLO', msj: 'Error al intentar eliminar la inscripción' });
        }
    }
}

inscripcionMateria = async (req, res) => {
    const {idCarrera, estudiantes} = req.body;
    try{
        const nuevaLista = await estudianteCarreraBD.inscripcionMateria(idCarrera, estudiantes);
        res.status(201).json({estado:'OK', msj:'Incripción a la carrera realizada'});
    }catch (exec){
        throw exec;
    }
}

module.exports={
    buscarPorId,
    buscarTodos,
    crear,
    eliminar,
    inscripcionMateria
}