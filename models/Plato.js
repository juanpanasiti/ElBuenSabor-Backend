const mongoose = require('mongoose')

const PlatoSchema = mongoose.Schema({
    denominacion: {
        type: String
    },
    tiempoCocina: {
        type: Number
    },
    previoVenta: {
        type: mongoose.SchemaTypes.Decimal128
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