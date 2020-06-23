const mongoose = require('mongoose')

const DetalleIngredienteSchema = mongoose.Schema({
    platoId: {
        type: String
    },
    insumoId: {
        type: Boolean
    },
    cantidad: {
        type: Number
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('DetalleIngrediente', DetalleIngredienteSchema)