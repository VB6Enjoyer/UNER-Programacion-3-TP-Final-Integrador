const estudianteMateriaBD = require('../baseDatos/estudianteMateriaBD');

buscarPorId = async(req, res) => {
    try{
        const idEstudianteMateria = req.params.idEstudianteMateria;   
        
        if(!idEstudianteMateria) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const estudianteMateria = await estudianteMateriaBD.buscarPorId(idEstudianteMateria);

        res.json({estado:'OK', dato:estudianteMateria});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) => {
    try{
        const estudiantesMaterias = await estudianteMateriaBD.buscarTodos();

        res.json({estado:'OK', dato:estudiantesMaterias});

    }catch (exec){
        throw exec;
    }
}

crear = async (req, res) => {
    const {fecha, estudiante, materia} = req.body;

    if(!fecha || !estudiante || !materia){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const estudianteMateria = {
            fecha:fecha, 
            estudiante:estudiante, 
            materia:materia
        }; 

        try{
            const estudianteMateriaNuevo = await estudianteMateriaBD.crear(estudianteMateria);
            res.status(201).json({estado:'OK', msj:'Inscripción a la materia realizada', dato:estudianteMateriaNuevo});
        }catch(exec){
            throw exec;
        }
    }
}

eliminar = async (req, res) => {
    const idEstudianteMateria = req.params.idEstudianteMateria;

    if (!idEstudianteMateria) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el ID de inscripción' });
    } else {
        try {
            await estudianteMateriaBD.eliminar(idEstudianteMateria);
            res.status(200).json({ estado: 'OK', msj: 'Inscripción eliminada' });
        } catch (error) {
            res.status(500).json({ estado: 'FALLO', msj: 'Error al intentar eliminar la inscripción' });
        }
    }
}

inscripcionMateria = async (req, res) => {
    const {idMateria, estudiantes} = req.body;
    try{
        const nuevaLista = await estudianteMateriaBD.inscripcionMateria(idMateria, estudiantes);
        res.status(201).json({estado:'OK', msj:'Incripción a la materia realizada'});
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