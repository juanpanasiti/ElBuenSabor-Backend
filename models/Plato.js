const mongoose = require('mongoose')

const PlatoSchema = mongoose.Schema({
    denominacion: {
        type: String
    },
    tiempoCocina: {
        type: Number
    },
    previoVenta: {
        type: Number
    },
    imagenPath: {
        type: String
    },
    rubroId: {
        type: String
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Plato', PlatoSchema)