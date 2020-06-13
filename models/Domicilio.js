const mongoose = require('mongoose')

const DomicilioSchema = mongoose.Schema({
    usuarioID: {
        type: String
    },
    alias: {
        type: String
    },
    calle: {
        type: String
    },
    numero: {
        type: Number
    },
    localidad: {
        type: String
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Domicilio', DomicilioSchema)