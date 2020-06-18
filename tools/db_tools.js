const mongoose = require('mongoose')
const config = require('../config.json')
const db_conn = `mongodb://${config.db_config.host}:${config.db_config.port}/${config.db_config.name}`
let db

exports.DBConnectMongoose = () => {
    return new Promise( (resolve, reject) => {
        if(db) {
            return db
        }
        mongoose.Promise = global.Promise

        //Conexion a la DB
        mongoose.connect(db_conn).then(() => {
            console.log(`Conectado a la DB ${config.db_config.name}`);
            resolve(db)
        })
        .catch( err => {
            console.log(`Erro al conectar a la base de datos: ${err}`);
            reject(db)
        })
    })
}//exports.DBConnectMongoose

exports.getDBConexion = () => {
    if(db){
        return db
    }

    console.log('No hay ninguna conexión a MongoDB :(');
    return null
}//exports.getDBConexion