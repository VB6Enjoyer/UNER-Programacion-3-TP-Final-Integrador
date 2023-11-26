const conexion = require('./conexionBDBedelia');

const buscar = async (correoElectronico, clave) => {
    
    const consulta = `SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256) AND activo = 1`;
    
    const [usuario] = await conexion.query(consulta, [correoElectronico, clave]);
    
    return usuario[0];
}

const buscarPorId = async (idUsuario) => {
    
    const consulta = `SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario as u WHERE u.idUsuario = ? AND activo = 1`;
    
    const [usuario] = await conexion.query(consulta, [idUsuario ]);

    return usuario[0];

}

module.exports = {
    buscar, 
    buscarPorId
}
