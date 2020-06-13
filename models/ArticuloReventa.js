const mongoose = require('mongoose')

const ArticuloReventaSchema = mongoose.Schema({
    denominacion: {
        type: String
    },
    precioCompra: {
        type: mongoose.SchemaTypes.Decimal128
    },
    precioVenta: {
        type: mongoose.SchemaTypes.Decimal128
    },
    stockActual: {
        type: Number
    },
    stockMinimo: {
        type: Number
    },
    stockMaximo: {
        type: Number
    },
    unidadMedida: {
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

module.exports = mongoose.model('ArticuloReventa', ArticuloReventaSchema)