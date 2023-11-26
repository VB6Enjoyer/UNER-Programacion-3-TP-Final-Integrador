const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
    host: 'localhost',
    user: 'bedelia12',
    database: 'bedelia12',
    password: '2023$prog3'
});


module.exports = conexion