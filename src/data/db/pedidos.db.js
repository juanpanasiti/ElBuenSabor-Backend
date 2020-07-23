const mongoose = require("mongoose");
require("../models/Pedido");
const { logSuccess, logError, logInfo } = require("../../config/logger.config");

//Registrar Schema
const Pedido = mongoose.model("Pedido");

exports.Pedido = Pedido;

//Contar pedidos
exports.countPedidos = () => {
  return new Promise((resolve, reject) => {
    Pedido.countDocuments()
      .then((count) => {
        resolve(count);
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //exports.countPedidos

//Crear
exports.savePedido = (pedidoData) => {
  return new Promise((resolve, reject) => {
    const pedido = new Pedido(pedidoData);
    pedido
      .save()
      .then((pedido) => {
        logSuccess("Guardado pedido ID: " + pedido._id);
        resolve(pedido);
      })
      .catch((err) => {
        logError("Error -> pedidos.db -> savePedido -> " + err);
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
        logSuccess(`Encontrados ${pedidos.length} pedidos`);
        resolve(pedidos);
      })
      .catch((err) => {
        logError("Error -> pedidos.db -> getPedidos -> " + err);
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
        logError("Error -> pedidos.db -> getPedidoById -> " + err);
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
        logError("Error -> pedidos.db -> updatePedido " + err);
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
        logError("Error -> pedidos.db -> setBorradoPedido -> " + err);
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
        logError("Error -> pedidos.db -> hardDeletePedido -> " + err);
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
            logError("Error -> pedidos.db -> addDetalle -> " + err);
            reject(error);
          });
      })
      .catch((error) => {
        logError("Error -> pedidos.db -> addDetalle -> " + err);
        reject(error);
      });
  });
}; //exports.addDetalle

//Remover ID de detalle de la lista de detalles del pedido
exports.removeDetalle = (detalleId, pedidoId) => {
  return new Promise((resolve, reject) => {
    this.getPedido(pedidoId)
      .then((pedido) => {
        const detalle = removeItemFromList(pedido.detalle, detalleId);
        pedido.detalle = detalle;
        this.updatePedido(pedidoId, pedido)
          .then((pedidoEd) => {
            resolve(pedidoEd);
          })
          .catch((error) => {
            logError("Error -> pedidos.db -> removeDetalle -> " + err);
            reject(error);
          });
      })
      .catch((error) => {
        logError("Error -> pedidos.db -> removeDetalle -> " + err);
        reject(error);
      });
  });
}; //exports.removeDetalle

///// Estados de pedidos
exports.getPedidosByEstado = (estado) => {
  return new Promise((resolve, reject) => {
    Pedido.find({ estado: estado })
      .populate("detalle")
      .then((pedidos) => {
        logSuccess(`Encontrados ${pedidos.length} pedidos ${estado}`);
        resolve(pedidos);
      })
      .catch((err) => {
        logError("Error -> pedidos.db -> getPedidos -> " + err);
        reject(err);
      });
  });
};

exports.getPedidosPendientesAnteriores = (fecha) => {
  return new Promise((resolve, reject) => {
    Pedido.find({
      $or: [{ estado: "pendiente" }, { estado: "en proceso" }],
      fecha: { $lt: fecha },
    })
      .then((pedidos) => {
        logInfo(`Encontrados ${pedidos.length} pedidos`);
        resolve(pedidos);
      })
      .catch((err) => {
        logError(
          "Error -> pedidos.db -> getPedidosPendientesAnteriores -> " + err
        );
        reject(err);
      });
  });
};
