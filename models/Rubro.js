const mongoose = require('mongoose')

const RubroSchema = mongoose.Schema({
    denominacion: {
        type: String
    },
    esRubroInsumo: {
        type: Boolean
    },
    rubroPadreId: {
        type: String
    },
    borrado: {
        type: Boolean,
        default: false
    }
})