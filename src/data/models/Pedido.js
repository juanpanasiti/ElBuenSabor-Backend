const mongoose = require("mongoose");

//Definición del SCHEMA
const pedidoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now(),
  },
  numero: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  minutosDemora: {
    type: Number,
    required: true,
  },
  delivery: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    required: true,
  },
  formaPago: {
    type: String,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  detalle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DetallePedido",
    required: true,
  },
  factura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Factura",
    default: null,
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

//Definición del Modelo
mongoose.model("Pedido", pedidoSchema);
