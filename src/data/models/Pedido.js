const mongoose = require("mongoose");
const { estadoPedido } = require("../static/models.options.statics");

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
    default: estadoPedido()[0],
  },
  minutosDemora: {
    type: Number,
    default: 0,
  },
  delivery: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
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
    default:null,
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
