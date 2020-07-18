const mongoose = require('mongoose')

const DetalleIngredienteSchema = mongoose.Schema({
    plato: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plato',
        required: true
    },
    insumo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Insumo',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('DetalleIngrediente', DetalleIngredienteSchema)