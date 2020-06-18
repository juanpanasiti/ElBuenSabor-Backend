const db_tools = require("../tools/db_tools");
const mongoose = require("mongoose");
require('../models/Rol')

//Conectar db
const db = db_tools.getDBConexion();

//Registrar Schema
const Rol = mongoose.model('Rol')

exports.Rol = Rol;
exports.getRoles = () => {
    return new Promise((resolve, reject) => {
        Rol.find({borrado: false})
            .then(roles => {
                console.log(`Encontrados ${roles.length} roles`)
                resolve(roles)
            })
            .catch(err => {
                console.log('Error obteniendo roles en roles.db ' + err);
                reject(err)
            })
    })
}//exports.getRoles