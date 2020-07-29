const pedidosService = require("../services/pedidos.services");
const utils = require("../config/logger.config");
const { logError, logWarning, logInfo } = require("../config/logger.config");
const { estadoPedido } = require("../data/static/models.options.statics");

exports.createPedido = (req, res) => {
  const pedidoData = req.body;
  pedidosService
    .createPedido(pedidoData)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> createPedido " + err);
      res.status(400).json(err);
    });
}; //exports.createPedido

// exports.getPedidos = (req, res) => {
//   pedidosService
//     .getPedidos()
//     .then((pedidos) => {
//       res.json(pedidos);
//     })
//     .catch((err) => {
//       utils.logError("Error -> pedidos.routes -> getPedidos " + err);
//     });
// }; //exports.getPedidos

exports.getPedido = (req, res) => {
  pedidosService
    .getPedidoById(req.params.id)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      utils.logError("Error -> pedidos.routes -> getPedido " + err);

      res.status(400).json(err);
    });
}; //getPedido

// exports.updatePedido = (req, res) => {
//   const pedidoData = req.body;
//   pedidosService
//     .updatePedido(req.params.id, pedidoData)
//     .then((pedido) => {
//       res.json(pedido);
//     })
//     .catch((err) => {
//       utils.logError("Error -> pedido.routes -> updatePedido " + err);

//       res.status(400).json(err);
//     });
// }; //exports.updatePedido

exports.softdeletePedido = (req, res) => {
  pedidosService
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
  pedidosService
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
  pedidosService
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
  if (req.originalUrl.includes("estado/cancelados")) {
    estado = estadoPedido()[0].toLowerCase()
  } else if (req.originalUrl.includes("estado/pendientes")) {
    estado = estadoPedido()[1].toLowerCase()
  } else if (req.originalUrl.includes("estado/aprobados")) {
    estado = estadoPedido()[2].toLowerCase()
  } else if (req.originalUrl.includes("estado/en-proceso")) {
    estado = estadoPedido()[3].toLowerCase()
  } else if (req.originalUrl.includes("estado/preparados")) {
    estado = estadoPedido()[4].toLowerCase()
  } else if (req.originalUrl.includes("estado/en-delivery")) {
    estado = estadoPedido()[5].toLowerCase()
  } else if (req.originalUrl.includes("estado/entregados")) {
    estado = estadoPedido()[6].toLowerCase()
  } else {
    logWarning("Algo malió sal!! el estado es " + estado);
  }
  pedidosService
    .getPedidosByEstado(estado)
    .then((pedidos) => {
      res.json(pedidos);
    })
    .catch((err) => {
      logError("Error -> pedidos.routes -> getPedidosByEstado " + err);
      res.status(400).json(err)
    });
}; //exports.getPedidos

//Actualizar estado de los pedidos
exports.updateEstadoPedido = (req, res) => {
  logInfo("Actualizando estado")
  let estado = "indefinido";
  if (req.originalUrl.includes("/cancelar/")) {
    estado = estadoPedido()[0].toLowerCase()
  } else if (req.originalUrl.includes("/aprobar/")) {
    estado = estadoPedido()[2].toLowerCase()
  } else if (req.originalUrl.includes("/comenzar/")) {
    estado = estadoPedido()[3].toLowerCase()
  } else if (req.originalUrl.includes("/terminar/")) {
    estado = estadoPedido()[4].toLowerCase()
  } else if (req.originalUrl.includes("/enviar/")) {
    estado = estadoPedido()[5].toLowerCase()
  } else if (req.originalUrl.includes("/entregar/")) {
    estado = estadoPedido()[6].toLowerCase()
  } else {
    logError("Error al detectar el estado")
    res.status(400).json({message:"Error en el estado seleccionado"})
  }
  pedidosService
    .updateEstadoPedido(req.params.id, estado)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((err) => {
      logError("Error -> pedidos.routes -> updateEstadoPedido -> " + err.message);
      res.status(400).json(err)
    });
}; //exports.updateEstadoPedido