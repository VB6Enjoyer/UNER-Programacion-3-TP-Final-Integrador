const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

exports.enviarCorreo = async (req, res) =>{

    const {nombre, correo, mensaje} = req.body;
    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../utiles/handlebars/plantilla.hbs'), 'utf8');
    const correoTemplate = handlebars.compile(plantillaHds2);
  
    const datos = {
      nombre: nombre,
      correo: correo,
      mensaje: mensaje
    };
    
    const correoHtml = correoTemplate(datos);

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE,
        },
    })

    const opciones = {
        from : 'api-tp_prog3',
        to:'adriiangz@gmail.com',
        subject:'CONSULTAS',
        html:correoHtml
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    })
}