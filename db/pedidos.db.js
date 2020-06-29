const mongoose = require("mongoose");
require("../models/Pedido");

//Registrar Schema
const Pedido = mongoose.model("Pedido");

exports.Pedido = Pedido;

//Crear
exports.savePedido = (pedidoData) => {
  return new Promise((resolve, reject) => {
    const pedido = new Pedido(pedidoData);
    pedido
      .save()
      .then((pedido) => {
        console.log("Guardado artículo de pedido ID: " + pedido._id);
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.db -> savePedido -> " + err);
        reject(err);
      });
  });
}; //exports.savePedido

//Obtener no borrados
exports.getPedidos = () => {
  return new Promise((resolve, reject) => {
    Pedido.find({ borrado: false })
      .populate("detalle")
      .then((pedidos) => {
        console.log(`Encontrados ${pedidos.length} pedidos`);
        resolve(pedidos);
      })
      .catch((err) => {
        console.log("Error -> pedidos.db -> getPedidos -> " + err);
        reject(err);
      });
  });
}; //exports.getPedidos

//Obtener uno
exports.getPedidoById = (pedidoId) => {
  return new Promise((resolve, reject) => {
    Pedido.findById(pedidoId)
      .populate("detalle")
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.db -> getPedidoById -> " + err);
        reject(err);
      });
  });
}; //exports.getPedidoById

//Actualizar uno
exports.updatePedido = (id, pedidoData) => {
  return new Promise((resolve, reject) => {
    Pedido.findByIdAndUpdate(id, pedidoData, { new: true })
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.db -> updatePedido " + err);
        reject(err);
      });
  });
}; //exports.updatePedido

//Borrado lógico de uno
exports.setBorradoPedido = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Pedido.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.db -> setBorradoPedido -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoPedido

//Borrado físico de uno
exports.hardDeletePedido = (id) => {
  return new Promise((resolve, reject) => {
    Pedido.findByIdAndDelete({ _id: id })
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.db -> hardDeletePedido -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeletePedido

//Agregar ID de detalle a la lista de detalles del pedido
exports.addDetalle = (detalleId, pedidoId) => {
  return new Promise((resolve, reject) => {
    this.getPedido(pedidoId)
      .then((pedido) => {
        pedido.detalle.push(detalleId);
        this.updatePedido(pedidoId, pedido)
          .then((pedidoEd) => {
            resolve(pedidoEd);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //exports.addDetalle

//Remover ID de detalle de la lista de detalles del pedido
exports.removeDetalle = (detalleId, pedidoId) => {
  return new Promise((resolve, reject) => {
    this.getPedido(pedidoId)
      .then((pedido) => {
        const detalle = utils.removeItemFromList(pedido.detalle, detalleId);
        pedido.detalle = detalle;
        this.updatePedido(pedidoId, pedido)
          .then((pedidoEd) => {
            resolve(pedidoEd);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //exports.removeDetalle
