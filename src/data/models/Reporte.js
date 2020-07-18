const mongoose = require("mongoose");

//Definición del SCHEMA
const reporteSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: true,
  },
  archivo: {
    type: String,
    default: null,
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

//Definición del Modelo
mongoose.model("Reporte", reporteSchema);
