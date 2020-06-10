const mongoose = require('mongoose')

const DetalleIngredienteSchema = mongoose.Schema({
    platoId: {
        type: String
    },
    insumoId: {
        type: Boolean
    },
    cantidad: {
        type: mongoose.SchemaTypes.Decimal128
    }
})