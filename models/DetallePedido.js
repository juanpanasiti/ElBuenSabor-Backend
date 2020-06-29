const mongoose = require("mongoose");

//Definición del SCHEMA
const detallePedidoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pedido",
    required: true,
  },
  plato: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plato",
    default: null,
  },
  reventa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArticuloReventa",
    default: null,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  borrado: {
    type: Boolean,
    default: false,
  },
});

//Definición del Modelo
mongoose.model("DetallePedido", detallePedidoSchema);
