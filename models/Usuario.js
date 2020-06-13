const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
    email: {
        type: String
    },
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    fechaNacimiento: {
        type: Date
    },
    telefono: {
        type: Boolean
    },
    borrado: {
        type: Boolean,
        default: false
    }
})