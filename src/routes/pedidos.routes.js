const pedidosDomain = require("../services/pedidos.services");
const utils = require("../config/logger.config");

exports.createPedido = (req, res) => {
  const pedidoData = req.body;
  pedidosDomain
    .createPedido(pedidoData)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> createPedido " + err);
      res.status(400).json(err);
    });
}; //exports.createPedido

exports.getPedidos = (req, res) => {
  pedidosDomain
    .getPedidos()
    .then((pedidos) => {
      res.json(pedidos);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> getPedidos " + err);
    });
}; //exports.getPedidos

exports.getPedido = (req, res) => {
  pedidosDomain
    .getPedidoById(req.params.id)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> getPedido " + err);

      res.status(400).json(err);
    });
}; //getPedido

exports.updatePedido = (req, res) => {
  const pedidoData = req.body;
  pedidosDomain
    .updatePedido(req.params.id, pedidoData)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedido.routes -> updatePedido " + err);

      res.status(400).json(err);
    });
}; //exports.updatePedido

exports.softdeletePedido = (req, res) => {
  pedidosDomain
    .setBorradoPedido(req.params.id, true)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> softdeletePedido -> " + err);
      res.json(err);
    });
}; //exports.softdeletePedido

exports.softundeletePedido = (req, res) => {
  pedidosDomain
    .setBorradoPedido(req.params.id, false)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> softundeletePedido -> " + err);
      res.json(err);
    });
}; //exports.softundeletePedido

exports.hardDeletePedido = (req, res) => {
  pedidosDomain
    .hardDeletePedido(req.params.id)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> hardDeletePedido -> " + err);
      res.json(err);
    });
}; //exports.hardDeletePedido

///// Estados de pedidos
//Obtener Pedidos por Estado
exports.getPedidosByEstado = (req, res) => {
  let estado = "indefinido";
  if (req.originalUrl.includes("estado/pendientes")) {
    estado = "pendiente";
  } else if (req.originalUrl.includes("estado/cancelados")) {
    estado = "cancelado";
  } else if (req.originalUrl.includes("estado/en-proceso")) {
    estado = "en proceso";
  } else if (req.originalUrl.includes("estado/preparados")) {
    estado = "preparado";
  } else if (req.originalUrl.includes("estado/en-delivery")) {
    estado = "en delivery";
  } else if (req.originalUrl.includes("estado/entregados")) {
    estado = "entregado";
  } else {
    utils.logWarning("Algo malió sal!! el estado es " + estado);
  }
  pedidosDomain
    .getPedidosByEstado(estado)
    .then((pedidos) => {
      res.json(pedidos);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> getPedidosByEstado " + err);
    });
}; //exports.getPedidos
