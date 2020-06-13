const mongoose = require('mongoose')

//Definición del SCHEMA
const rolSchema = new mongoose.Schema({
    usuarioID: {
        type: String
    },
    nombreRol: {
        type: String
    },
    activo: {
        type: Boolean
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

//Definición del Modelo
mongoose.model('Rol', rolSchema)

