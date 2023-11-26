const express = require('express');
const cors = require('cors');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');
require('dotenv').config();

const passport = require("passport");
require('./config/passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors());

const { esBedel } = require('./middlewares/esBedel');
const { esDecano } = require('./middlewares/esDecano');

// Ruta pública para acceder a los imagenes
app.get('/archivos/:nombreArchivo', (req, res) => {
    const nombreArchivo = req.params.nombreArchivo;
    res.sendFile(path.join(__dirname, 'archivos', nombreArchivo));
});

//PUBLICO
const v1Publico = require('./v1/rutas/publico');
const v1Auth = require('./v1/rutas/auth');

//PRIVADO
const v1Estudiante = require('./v1/rutas/estudiante');
const v1Materia = require('./v1/rutas/materia');
const v1Carrera = require('./v1/rutas/carrera');
const v1EstudianteMateria = require('./v1/rutas/estudianteMateria');
const v1EstudianteCarrera = require('./v1/rutas/estudianteCarrera');

const v1Estadistica = require('./v1/rutas/estadistica');

//RUTAS PUBLICAS
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/auth', v1Auth);

//RUTAS PRIVADAS
app.use('/api/v1/estudiante', [passport.authenticate('jwt', {session: false}), esBedel], v1Estudiante);
app.use('/api/v1/materia', [passport.authenticate('jwt', {session: false}), esBedel], v1Materia);
app.use('/api/v1/carrera', [passport.authenticate('jwt', {session: false}), esBedel], v1Carrera);
app.use('/api/v1/estudiantecarrera', [passport.authenticate('jwt', {session: false}), esBedel], v1EstudianteCarrera);
app.use('/api/v1/estudiantemateria', [passport.authenticate('jwt', {session: false}), esBedel], v1EstudianteMateria);

app.use('/api/v1/estadistica', [passport.authenticate('jwt', {session: false}), esDecano], v1Estadistica);

//RUTAS TESTEO
app.use('/api/v1/test/estudiante', v1Estudiante);
app.use('/api/v1/test/materia', v1Materia);
app.use('/api/v1/test/carrera', v1Carrera);
app.use('/api/vi/test/estudianteMateria', v1EstudianteMateria);
app.use('/api/vi/test/estudianteCarrera', v1EstudianteCarrera);
app.use('/api/v1/test/estadistica', v1Estadistica)

app.listen(process.env.PUERTO, ()=>{
    console.log('🚀 API prog3 iniciada ' + process.env.PUERTO);
})