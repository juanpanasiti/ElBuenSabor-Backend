const mongoose = require('mongoose')

//Definición del SCHEMA
const rolSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nombreRol: {
        type: String,
        required: true
    },
    borrado: {
        type: Boolean,
        default: false
    }
})

//Definición del Modelo
mongoose.model('Rol', rolSchema)

