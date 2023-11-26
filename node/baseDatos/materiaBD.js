const conexion = require('./conexionBDBedelia');

const buscarPorId = async(idMateria) =>{
    
    const consulta = `SELECT  horasSemanales, nombreMateria,
    (CASE 
        WHEN tipoMateria = 0 THEN 'anual'
        WHEN tipoMateria = 1 THEN 'cuatrimestral'
        END) AS tipoMateria
    FROM materia 
    WHERE activo = 1 AND idMateria = ?`;
    
    const [materia] = await conexion.query(consulta, idMateria);
    
    return materia; 
}

const buscarTodos = async() =>{

    const consulta = `SELECT horasSemanales, nombreMateria,
    (CASE
        WHEN tipoMateria = 0 THEN 'anual'
        WHEN tipoMateria = 1 THEN 'cuatrimestral'
        END) AS tipoMateria
    FROM materia 
    WHERE activo = 1`;
    
    const [materias] = await conexion.query(consulta);
    
    return materias;
}

const eliminar = async(idMateria) =>{
    const consulta = `UPDATE materia SET activo = 0 WHERE idMateria = ?`;
    await conexion.query(consulta, [idMateria]);
}

const actualizar = async (idMateria, nuevosDatos) => {
    const consulta = 'UPDATE materia SET horasSemanales=?, nombreMateria=?, tipoMateria=? WHERE idMateria = ?';
    const valores = [
        nuevosDatos.horasSemenales,
        nuevosDatos.nombreMateria,
        nuevosDatos.tipoMateria,
        idMateria
    ];
    await conexion.query(consulta, valores);
}


const crear = async(materia) =>{

    const consulta=`INSERT INTO materia SET ?`;

    const [materiaNueva] = await conexion.query(consulta, materia);

    return buscarPorId(materiaNueva.insertId);
}

module.exports = {
    buscarPorId,
    buscarTodos,
    actualizar,
    eliminar,
    crear,
}