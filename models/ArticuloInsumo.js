const mongoose = require('mongoose')

const ArticuloInsumoSchema = mongoose.Schema({
    denominacion: {
        type: String
    },
    precioCompra: {
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