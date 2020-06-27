const mongoose = require('mongoose')

const PlatoSchema = mongoose.Schema({
    denominacion: {
        type: String,
        required: true
    },
    tiempoCocina: {
        type: Number,
        required: true
    },
    precioVenta: {
        type: Number,
        default: 0
    },
    imagenPath: {
        type: String,
        default: ""
    },
    rubro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rubro',
        required: true
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Plato', PlatoSchema)