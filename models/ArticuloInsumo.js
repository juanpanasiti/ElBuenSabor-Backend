const mongoose = require("mongoose");

const insumoSchema = mongoose.Schema({
  denominacion: {
    type: String,
  },
  precioCompra: {
    type: mongoose.SchemaTypes.Decimal128,
  },
  stockActual: {
    type: Number,
  },
  stockMinimo: {
    type: Number,
  },
  stockMaximo: {
    type: Number,
  },
  unidadMedida: {
    type: String,
  },
  rubro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rubro",
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

mongoose.model("Insumo", insumoSchema);
