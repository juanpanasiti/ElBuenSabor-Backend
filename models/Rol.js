const mongoose = require('mongoose')

const RolSchema = mongoose.Schema({
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