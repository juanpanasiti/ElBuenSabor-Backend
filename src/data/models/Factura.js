const mongoose = require('mongoose')

//Definición del SCHEMA
const facturaSchema = new mongoose.Schema({
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    archivo: {
        type: String,
        default: null
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

//Definición del Modelo
mongoose.model('Factura', facturaSchema)

