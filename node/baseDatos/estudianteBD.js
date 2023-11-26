const conexion = require('./conexionBDBedelia');

const buscarPorId = async (idEstudiante) => {

    const consulta = `SELECT  dni, nombre, apellido, foto,
    (CASE
        WHEN nacionalidad = 0 THEN 'arg'
        WHEN nacionalidad = 1 THEN 'uru'
        WHEN nacionalidad = 2 THEN 'chi'
        WHEN nacionalidad = 3 THEN 'par'
        WHEN nacionalidad = 4 THEN 'bra'
        WHEN nacionalidad = 5 THEN 'bol'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1 AND idEstudiante = ?`;

    const [estudiante] = await conexion.query(consulta, idEstudiante);    

    return estudiante;
}

const buscarTodos = async () => {

    const consulta = `SELECT  idEstudiante, dni, nombre, apellido, fechaNacimiento, correoElectronico, celular, foto, 
    (CASE
        WHEN nacionalidad = 0 THEN 'argentino'
        WHEN nacionalidad = 1 THEN 'uruguayo'
        WHEN nacionalidad = 2 THEN 'chileno'
        WHEN nacionalidad = 3 THEN 'paraguayo'
        WHEN nacionalidad = 4 THEN 'brasilero'
        WHEN nacionalidad = 5 THEN 'boliviano'
        ELSE ''
    END) AS nacionalidad 
    FROM estudiante 
    WHERE activo = 1`;

    const [estudiantes] = await conexion.query(consulta);    

    return estudiantes;
}

const eliminar = async (idEstudiante) => {
    const consulta = 'DELETE estudiante SET activo = 0 WHERE idEstudiante = ?';
    await conexion.query(consulta, [idEstudiante]);    
}

const actualizar = async (idEstudiante, nuevosDatos) => {
    const consulta = 'UPDATE estudiante SET dni=?, nombre=?, apellido=?, fechaNacimiento=?, nacionalidad=?, correoElectronico=? WHERE idEstudiante = ?';
    const valores = [
        nuevosDatos.dni,
        nuevosDatos.nombre,
        nuevosDatos.apellido,
        nuevosDatos.fechaNacimiento,
        nuevosDatos.nacionalidad,
        nuevosDatos.correoElectronico,
        idEstudiante
    ];
    await conexion.query(consulta, valores);
}

const crear = async (estudiante) => {

    const consulta = 'INSERT INTO estudiante SET ?';
    
    const [estudianteNuevo] = await conexion.query(consulta, estudiante);

    return buscarPorId(estudianteNuevo.insertId);
}



module.exports = {
    buscarPorId,
    buscarTodos,
    eliminar,
    actualizar,
    crear
}
