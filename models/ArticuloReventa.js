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
        type: mongoose.SchemaTypes.Decimal128
    },
    stockMinimo: {
        type: mongoose.SchemaTypes.Decimal128
    },
    stockMaximo: {
        type: mongoose.SchemaTypes.Decimal128
    },
    unidadMedida: {
        type: String
    },
    rubroId: {
        type: String
    }
})