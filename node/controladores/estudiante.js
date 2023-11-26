const estudianteBD = require('../baseDatos/estudianteBD');

buscarPorId = async(req, res) => {
    try{
        const idEstudiante = req.params.idEstudiante;   
        
        if(!idEstudiante) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const estudiante = await estudianteBD.buscarPorId(idEstudiante);

        res.json({estado:'OK', dato:estudiante});

    }catch (exec){
        throw exec;
    }
}

buscarTodos = async(req, res) => {
    try{
        const estudiantes = await estudianteBD.buscarTodos();

        res.json({estado:'OK', dato:estudiantes});

    }catch (exec){
        throw exec;
    }
}

eliminar = async (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    if(!idEstudiante){
        res.status(404).json({estado:'FALLO', msj:'no se especifico el id del estudiante'});
    }else{
        try{
            await estudianteBD.eliminar(idEstudiante);
            res.status(200).json({estado:'OK', msj:'Estudiante eliminado'});
        }catch (error){
            throw exec;
        }
    }
}

actualizar = async (req, res) => {
    const idEstudiante = req.params.idEstudiante;

    if (!idEstudiante) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el ID del estudiante' });
    } else {
        const nuevosDatos = req.body;

        try {
            await estudianteBD.actualizar(idEstudiante, nuevosDatos);
            res.status(200).json({ estado: 'OK', msj: 'Estudiante actualizado' });
        } catch (error) {
            
            console.error(error);
            res.status(500).json({ estado: 'FALLO', msj: 'Error al actualizar el estudiante' });
        }
    }
}


crear = async (req, res) => {
    const {dni, nombre, apellido, fechaNacimiento, nacionalidad, correoElectronico, celular} = req.body;

    let filename;
    if(!req.file){
        filename = 'default.jpg'; 
    }else{
        filename = req.file.filename; 
    }

    if(!dni || !nombre || !apellido || !nacionalidad || !correoElectronico){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const estudiante = {
            dni:dni, 
            nombre:nombre, 
            apellido:apellido, 
            fechaNacimiento:fechaNacimiento, 
            nacionalidad:nacionalidad, 
            correoElectronico:correoElectronico, 
            celular:celular, 
            foto:filename 
        }; 

        try{
            const estudianteNuevo = await estudianteBD.crear(estudiante);
            res.status(201).json({estado:'OK', msj:'Estudiante creado', dato:estudianteNuevo});
        }catch(exec){
            throw exec;
        }
    }
}

module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    actualizar,
    crear
}