const conexion = require('./conexionBDBedelia');

const buscarPorId = async (idEstudianteCarrera) => {

    const consulta = `SELECT estudiante.nombre, estudiante.apellido, carrera.nombreCarrera, estudiantecarrera.fechaAlta,
    (CASE
        WHEN modalidad = 0 THEN 'Presencial'
        WHEN modalidad = 1 THEN 'Virtual'
        ELSE ''
    END) AS modalidad
    FROM estudiantecarrera
    INNER JOIN estudiante ON estudiantecarrera.estudiante = estudiante.idEstudiante
    INNER JOIN carrera ON estudiantecarrera.carrera = carrera.idCarrera
    WHERE estudiantecarrera.idEstudianteCarrera = ?`;

    const [estudianteCarrera] = await conexion.query(consulta, idEstudianteCarrera);    

    return estudianteCarrera;
}

const buscarTodos = async () => {

    const consulta = `SELECT estudiante.nombre, estudiante.apellido, carrera.nombreCarrera, estudiantecarrera.fechaAlta,
    (CASE
        WHEN modalidad = 0 THEN 'Presencial'
        WHEN modalidad = 1 THEN 'Virtual'
        ELSE ''
    END) AS modalidad
    FROM estudiantecarrera
    INNER JOIN estudiante ON estudiantecarrera.estudiante = estudiante.idEstudiante
    INNER JOIN carrera ON estudiantecarrera.carrera = carrera.idCarrera`;

    const [estudiantesCarrera] = await conexion.query(consulta);    

    return estudiantesCarrera;
}

const eliminar = async(idCarrera)=>{

    const consulta =`DELETE FROM estudiantecarrera WHERE estudiantecarrera.idEstudianteCarrera = ?`;

    const [result] = await conexion.query(consulta, idCarrera);
    
    return result;
}

const crear = async (estudianteCarrera) => {

    const consulta = 'INSERT INTO estudiantecarrera SET ?';
    
    const [estudianteCarreraNuevo] = await conexion.query(consulta, estudianteCarrera);

    return buscarPorId(estudianteCarreraNuevo.insertId);
}

module.exports ={
    buscarPorId,
    buscarTodos,
    eliminar,
    crear,
}