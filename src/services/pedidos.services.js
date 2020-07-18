const pedidosDB = require("../data/db/pedidos.db");

exports.createPedido = (pedidoData) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .savePedido(pedidoData)
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> createPedido -> " + err);
        reject(err);
      });
  });
}; //exports.createPedido

exports.getPedidos = () => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidos()
      .then((pedidos) => {
        resolve(pedidos);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> getPedidos -> " + err);
        reject(err);
      });
  });
}; //exports.getPedidos

exports.getPedidoById = (id) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidoById(id)
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> getPedidoById ->" + err);
        reject(err);
      });
  });
}; //exports.getPedidoById

exports.updatePedido = (id, pedidoData) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .updatePedido(id, pedidoData)
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> updatePedido " + err);
        reject(err);
      });
  });
}; //exports.updatePedido

exports.setBorradoPedido = (id, borrado) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .setBorradoPedido(id, borrado)
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> setBorradoPedido -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoPedido

exports.hardDeletePedido = (id) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .hardDeletePedido(id)
      .then((pedido) => {
        resolve(pedido);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> hardDeletePedido -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeletePedido

///// Estados de pedidos
exports.getPedidosByEstado = (estado) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidosByEstado(estado)
      .then((pedidos) => {
        resolve(pedidos);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> getPedidosByEstado -> " + err);
        reject(err);
      });
  });
};
