const mongoose = require("mongoose");

//Definición del SCHEMA
const detallePedidoSchema = new mongoose.Schema({
  pedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pedido",
    default: null,
  },
  platos: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plato",
        required:true,
      },
      cantidad: {
        type: Number,
        default: 1
      }
    }
  ],
  reventas: [
    {
      item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArticuloReventa",
        required: true,
      },
      cantidad: {
        type: Number,
        default: 1
      }
    }
  ],
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
