const materiaBD = require('../baseDatos/materiaBD');

buscarPorId = async (req, res) => {
  try {
    const idMateria = req.params.idMateria;

    if (!idMateria) {
      res.status(404).json({ estado: "FALLO", msj: "Falta el ID" });
    }

    const materia = await materiaBD.buscarPorId(idMateria);

    res.json({ estado: "OK", dato: materia });
  } catch (exec) {
    throw exec;
  }
};

buscarTodos = async (req, res) => {
  try {
    const materias = await materiaBD.buscarTodos();

    res.json({ estado: "OK", dato: materias });
  } catch (exec) {
    throw exec;
  }
};

eliminar = async (req, res) => {
  const idMateria = req.params.idMateria;

  if (!idMateria) {
    res
      .status(404)
      .json({ estado: "FALLO", msj: "No se ha especificado un ID" });
  } else {
    try {
      await materiaBD.eliminarMateria(idMateria);
      res.status(200).json({ estado: "OK", msj: "Materia eliminada" });
    } catch (exec) {
      throw exec;
    }
  }
};

actualizar = async (req, res) => {
  const idMateria = req.params.idMateria;

  if (!idMateria) {
      res.status(404).json({ estado: 'FALLO', msj: 'No se especificó el ID de la materia' });
  } else {
      const nuevosDatos = req.body;

      try {
          await materiaBD.actualizar(idMateria, nuevosDatos);
          res.status(200).json({ estado: 'OK', msj: 'Materia actualizada' });
      } catch (error) {
          
          console.error(error);
          res.status(500).json({ estado: 'FALLO', msj: 'Error al actualizar materia' });
      }
  }
}

crear = async (req, res) => {
  const { nombre, horasSemanales, tipoMateria } = req.body;

  if (!nombre || !horasSemanales || !tipoMateria) {
    res
      .status(404)
      .json({ estado: "FALLO", msj: "Faltan campos obligatorios" });
  } else {
    const materia = {
      horasSemanales: horasSemanales,
      nombre: nombre,
      tipoMateria: tipoMateria,
    };
    try {
      const materiaNueva = await materiaBD.crearMateria(materia);
      res
        .status(201)
        .json({ estado: "OK", msj: "Materia habilitada", dato: materiaNueva });
    } catch (exec) {
      throw exec;
    }
  }
};

module.exports = {
  buscarPorId,
  buscarTodos,
  actualizar,
  eliminar,
  crear
}
