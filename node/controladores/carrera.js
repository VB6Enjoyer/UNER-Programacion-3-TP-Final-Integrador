const carreraBD = require('../baseDatos/carreraBD');

buscarPorId = async(req, res) =>{
    try{
        const  idCarrera = req.params.idCarrera;
        
        if(!idCarrera){
            res.status(404).json({estado: 'FALLO', msj: 'Falta el ID'});
        }

        const carrera = await carreraBD.buscarPorId(idCarrera);
        
        res.json({estado: 'OK', dato: carrera});

    }catch(exec){
        throw exec;
    }
}

buscarTodos = async(req, res) =>{
    try{
        const carreras = await carreraBD.buscarTodos();
        res.status(200).json({estado: 'OK', dato: carreras});
    }catch(exec){
        throw exec;
    }
}

actualizar = async (req, res) => {
    const idCarrera = req.params.idCarrera;

    if (!idCarrera) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el ID de carrera' });
    } else {
        const nuevosDatos = req.body;

        try {
            await carreraBD.actualizar(idCarrera, nuevosDatos);
            res.status(200).json({ estado: 'OK', msj: 'Carrera actualizada' });
        } catch (error) {
            
            console.error(error);
            res.status(500).json({ estado: 'FALLO', msj: 'Error al actualizar carrera' });
        }
    }
}

eliminar = async(req, res) =>{
    const idCarrera = req.params.idCarrera;

    if(!idCarrera){
        res.status(404).json({estado: 'FALLO', msj:'No se ha especificado un ID'});
    }else{
        try{
            await carreraBD.eliminar(idCarrera);
            res.status(200).json({estado: 'OK', msj: 'Carrera eliminada'});
        }catch(exec){
            throw exec;
        }
    }
}


crear = async(req, res) =>{
    const {nombreCarrera, modalidad} = req.body

    if(!nombreCarrera || !modalidad){
        res.status(404).json({estado: 'FALLO', msj: 'Faltan campos obligatorios'});
    }else{
        const carrera ={
            nombreCarrera: nombreCarrera,
            modalidad: modalidad
        };
        try{
            const carreraNueva = await carreraBD.crear(carrera);
            res.status(201).json({estado: 'OK', msj: 'Carrera habilitada', dato: carreraNueva});
        }catch(exec){
            throw exec;
        }
    }

}

module.exports ={
    buscarPorId,
    buscarTodos,
    actualizar,
    eliminar,
    crear,
}