const mysql = require ('mysql');
const { promisify } = require ('util'); 
//promisify es un modulo de node que transforma calbacks en promises.

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=> {
    if (err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La coneccion con la base de datos se cerro');
        }
        if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conecciones');
        }
        if(err.code === 'ECONNREFUSED') {
            console.error('La coneccion con la base de datos fue rechazada');
        }
    }
    if(connection) connection.release();
    console.log('La base de datos esta en linea');
    return;
});
pool.query = promisify(pool.query);
module.exports = pool;