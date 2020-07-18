const mongoose = require("mongoose");

const DomicilioSchema = mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  alias: {
    type: String,
    required: true
  },
  calle: {
    type: String,
    required: true
  },
  numero: {
    type: Number,
    required: true
  },
  localidad: {
    type: String,
    required: true
  },
  piso: {
    type: String,
    default: ""
  },
  departamento: {
    type: String,
    default: ""
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Domicilio", DomicilioSchema);
