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
    .catch((error) => {
      utils.logError("Error -> pedidos.routes -> createPedido " + error);
      res.status(400).json(error);
    });
}; //exports.createPedido

// exports.getPedidos = (req, res) => {
//   pedidosService
//     .getPedidos()
//     .then((pedidos) => {
//       res.json(pedidos);
//     })
//     .catch((error) => {
//       utils.logError("Error -> pedidos.routes -> getPedidos " + error);
//     });
// }; //exports.getPedidos

exports.getPedido = (req, res) => {
  pedidosService
    .getPedidoById(req.params.id)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((error) => {
      utils.logError("Error -> pedidos.routes -> getPedido " + error);

      res.status(400).json(error);
    });
}; //getPedido

// exports.updatePedido = (req, res) => {
//   const pedidoData = req.body;
//   pedidosService
//     .updatePedido(req.params.id, pedidoData)
//     .then((pedido) => {
//       res.json(pedido);
//     })
//     .catch((error) => {
//       utils.logError("Error -> pedido.routes -> updatePedido " + error);

//       res.status(400).json(error);
//     });
// }; //exports.updatePedido

exports.softdeletePedido = (req, res) => {
  pedidosService
    .setBorradoPedido(req.params.id, true)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((error) => {
      utils.logError("Error -> pedidos.routes -> softdeletePedido -> " + error);
      res.json(error);
    });
}; //exports.softdeletePedido

exports.softundeletePedido = (req, res) => {
  pedidosService
    .setBorradoPedido(req.params.id, false)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((error) => {
      utils.logError("Error -> pedidos.routes -> softundeletePedido -> " + error);
      res.json(error);
    });
}; //exports.softundeletePedido

exports.hardDeletePedido = (req, res) => {
  pedidosService
    .hardDeletePedido(req.params.id)
    .then((pedido) => {
      res.json(pedido);
    })
    .catch((error) => {
      utils.logError("Error -> pedidos.routes -> hardDeletePedido -> " + error);
      res.json(error);
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
    .catch((error) => {
      logError("Error -> pedidos.routes -> getPedidosByEstado " + error);
      res.status(400).json(error)
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
    .catch((error) => {
      logError("Error -> pedidos.routes -> updateEstadoPedido -> " + error.message);
      res.status(400).json(error)
    });
}; //exports.updateEstadoPedido

exports.facturarPedido = (req,res) => {
  pedidosService.facturarPedido(req.params.id)
  .then((factura) => {
    res.json(factura)
  })
  .catch((error) => {
    logError("Error -> pedidos.routes -> facturarPedido -> " + error.message);
    res.status(400).json(error)
  });
}//facturarPedido