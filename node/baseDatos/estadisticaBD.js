const conexion = require('./conexionBDBedelia');

const estadistica = async () => {
    
    const consulta = 'call procEstadistica()';
    
    const [results] = await conexion.query(consulta);    

    const datos = {
        mas30 : results[0][0].mas30,
        cantidadInscriptos : results[0][0].cantidadInscriptos
    }
    return datos;
}

const estadistica2 = async (carrera) => {
    const consulta = 'call datosPdf(?)';
    
    const [results] = await conexion.query(consulta,[carrera]);   

    const inscriptos = results[0];
    return inscriptos;
}

module.exports = {
    estadistica,
    estadistica2
}
