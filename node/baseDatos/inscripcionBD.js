const conexion = require("./conexionBDBedelia");

//TODO No sé si está bien esto, pero el ejemplo este de convocatorias me parece lo más parecido a las inscripciones,
//TODO aunque el profesor dijo que "convocatoria" serían las materias --Mario
const inscripcionPorId = async (idInscripcion) => {
  const consulta = `SELECT FROM inscripcion as i
                    INNER JOIN estudiante AS e ON e.IdEstudiante = i.estudiante
                    WHERE i.idInscripcion = ?`;

  const [inscripcion] = await conexion.query(consulta, [idInscripcion]);

  return inscripcion;
};

const buscarInscripciones = async () => {
  const consulta = `SELECT * FROM inscripcion AS i INNER JOIN estudiante AS e ON e.idEstudiante = i.estudiante`;

  const [inscripciones] = await conexion.query(consulta);

  return inscripciones;
};

//TODO esto debería añadir la fecha aunque creo que no debería haber una tabla inscripción
//TODO si es que es necesaria todo este endpoint
const nueva = async (inscripcion) => {
  const consulta = `INSERT INTO inscripcion SET ?`;
  const [nuevaInscripcion] = await conexion.query(consulta, inscripcion);

  return inscripcionPorId(nuevaInscripcion.insertdId);
};

//TODO Acá iría una modificación a las inscripciones/convocatorias, no la incluí porque no creo que una inscripción se modifique --Mario

module.exports = {
  inscripcionPorId,
  buscarInscripciones,
  nueva,
};
