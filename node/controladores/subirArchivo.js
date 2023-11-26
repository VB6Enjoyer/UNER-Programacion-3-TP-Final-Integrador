const multer = require('multer');

/*
configuracion multer.
le indicamos donde guardamos los archivos
y el nombre del archivo
*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'archivos');
    },
    filename:function(req, file, cb) {  // asignamos el nombre del archivo      
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname );
    }
  })
  
  const upload = multer({ storage: storage });

  exports.upload = upload.single('foto');