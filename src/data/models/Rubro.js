const mongoose = require("mongoose");

//Definición del Schema
const rubroSchema = new mongoose.Schema({
  denominacion: {
    type: String,
    required: true,
  },
  esRubroInsumo: {
    type: Boolean,
    default: false,
  },
  rubroPadre: {
    //Era String, lo cambie para probar si solucionamos error al guardar "" para los rubros raíz
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rubro",
    default: null, //Un rubro raíz debe tener el campo en null o no
  },
  imagenPath: {
    type: String,
    default: "",
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

//Definición del modelo Rubro
mongoose.model("Rubro", rubroSchema);
