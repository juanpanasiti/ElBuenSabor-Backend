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
    },
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rol'
        }
    ]
})

module.exports = mongoose.model('Usuario', UsuarioSchema)