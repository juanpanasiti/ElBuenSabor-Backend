const mongoose = require('mongoose')

const ArticuloReventaSchema = mongoose.Schema({
    denominacion: {
        type: String
    },
    precioCompra: {
        type: Number
    },
    precioVenta: {
        type: Number
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