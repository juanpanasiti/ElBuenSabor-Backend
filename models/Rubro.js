const mongoose = require("mongoose");

//Definición del Schema
const rubroSchema = new mongoose.Schema({
  denominacion: {
    type: String,
    required: true
  },
  esRubroInsumo: {
    type: Boolean,
    default: false
  },
  rubroPadre: {
    type: String,
    ref: "Rubro",
    required: false,
    default: ""
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

//Definición del modelo Rubro
mongoose.model("Rubro", rubroSchema);