const conexion = require('./conexionBDBedelia');

const buscarPorId = async (idEstudianteMateria) => {

    const consulta = `SELECT estudiante.nombre, estudiante.apellido, materia.horasSemanales, materia.nombreMateria, estudiantemateria.fecha
    FROM estudiantemateria
    INNER JOIN estudiante ON estudiantemateria.estudiante = estudiante.idEstudiante
    INNER JOIN materia ON estudiantemateria.materia = materia.idMateria
    WHERE estudiantemateria.idEstudianteMateria = ?`;

    const [estudianteMateria] = await conexion.query(consulta, idEstudianteMateria);    

    return estudianteMateria;
}

const buscarTodos = async () => {

    const consulta = `SELECT estudiante.nombre, estudiante.apellido, materia.horasSemanales, materia.nombreMateria, estudiantemateria.fecha
    FROM estudiantemateria
    INNER JOIN estudiante ON estudiantemateria.estudiante = estudiante.idEstudiante
    INNER JOIN materia ON estudiantemateria.materia = materia.idMateria`;

    const [estudiantesMaterias] = await conexion.query(consulta);    

    return estudiantesMaterias;
}

const eliminar = async(idMateria)=>{

    const consulta =`DELETE FROM estudiantemateria WHERE estudiantemateria.idEstudianteMateria = ?`;

    const [result] = await conexion.query(consulta, idMateria);
    
    return result;
}

const crear = async (estudianteMateria) => {

    const consulta = 'INSERT INTO estudiantemateria SET ?';
    
    const [estudianteMateriaNuevo] = await conexion.query(consulta, estudianteMateria);

    return buscarPorId(estudianteMateriaNuevo.insertId);
}

module.exports ={
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
}