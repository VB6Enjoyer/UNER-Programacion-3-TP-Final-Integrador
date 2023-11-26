const conexion = require("./conexionBDBedelia");

const buscarPorId = async (idCarrera) => {
  const consulta = `SELECT nombreCarrera,
    (CASE
        WHEN modalidad = 0 THEN 'presencial'
        WHEN modalidad = 1 THEN 'virtual'
        WHEN modalidad = 2 THEN 'hibrida'
        END) AS modalidad
    FROM carrera 
    WHERE activo = 0 AND idCarrera =?`;

  const [carrera] = await conexion.query(consulta, idCarrera);

  return carrera;
};

const buscarTodos = async () => {
  const consulta = `SELECT nombreCarrera,
    (CASE 
            WHEN modalidad = 0 THEN 'presencial'
            WHEN modalidad = 1 THEN 'virtual'
            WHEN modalidad = 2 THEN 'hibrida'
            END) AS modalidad
    FROM carrera 
    WHERE activo = 0`;

  const [carrera] = await conexion.query(consulta);

  return carrera;
};

const eliminar = async (idCarrera) => {
  const consulta = `UPDATE carrera SET activo = 1 WHERE idCarrera = ?`;
  await conexion.query(consulta, [idCarrera]);
};

const actualizar = async (idCarrera, nuevosDatos) => {
  const consulta = 'UPDATE carrera SET nombreCarrera=?, modalidad=?';
  const valores = [
      nuevosDatos.nombreCarrera,
      nuevosDatos.modalidad,
      idCarrera
  ];
  await conexion.query(consulta, valores);
}


const crear = async (carrera) => {
  try {
    const consulta = `INSERT INTO carrera SET ?`;
    const [carreraNueva] = await conexion.query(consulta, carrera);

    // Si llegamos aquí, la inserción fue exitosa
    return buscarPorId(carreraNueva.insertId);
  } catch (error) {
    console.error('Error al crear carrera:', error);
    throw error; // Re-lanza el error para que pueda ser manejado en un nivel superior si es necesario
  }
};


module.exports = {
  buscarPorId,
  buscarTodos,
  actualizar,
  eliminar,
  crear,
};
