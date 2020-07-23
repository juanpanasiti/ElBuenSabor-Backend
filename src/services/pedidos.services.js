const pedidosDB = require("../data/db/pedidos.db");
const platosDB = require("../data/db/platos.db");
const reventasDB = require("../data/db/reventas.db");
const detallePedidoService = require("./detallesPedidos.services");
const {
  logInfo,
  logWarning,
  logError,
  logSuccess,
} = require("../config/logger.config");
const { newPedidoDTO } = require("../data/dto/pedido.dto");
const { estadoPedido } = require("../data/static/models.options.statics");

exports.createPedido = async (pedidoData) => {
  const pedidoDTO = newPedidoDTO();
  //Llenar datos al DTO
  pedidoDTO.fecha = Date.now();
  pedidoDTO.estado = estadoPedido()[0].toLowerCase();
  pedidoDTO.delivery = pedidoData.delivery;
  pedidoDTO.formaPago = pedidoData.formaPago;
  pedidoDTO.usuario = pedidoData.usuario;

  //Calcular demora del pedido
  await calcularDemora(pedidoDTO, pedidoData.platos);

  //Calcular costo del pedido
  await calcularCosto(pedidoDTO, pedidoData);

  //logInfo(pedidoDTO)
  return new Promise((resolve, reject) => {
    pedidosDB.countPedidos().then((count) => {
      pedidoDTO.numero = ++count;

      logWarning(pedidoDTO);
      //Crear nuevo pedido
      pedidosDB
        .savePedido(pedidoDTO)
        .then((pedidoG) => {
          detallePedidoService
            .createDetalle(pedidoData, pedidoG._id)
            .then((detalleG) => {
              pedidoG.detalle = detalleG._id;
              pedidosDB
                .updatePedido(pedidoG._id, pedidoG)
                .then((pedido) => {
                  logSuccess(pedido);
                  resolve(pedido);
                })
                .catch((error) => {
                  logError(error);
                  reject(error);
                });
            })
            .catch((error) => {
              logError(error);
              reject(error);
            });
        })
        .catch((error) => {
          logError(error);
          reject(error);
        });
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

exports.getPedidosByEstado = (estado) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidosByEstado(estado)
      .then((pedidos) => {
        resolve(pedidos);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> getPedidos -> " + err);
        reject(err);
      });
  });
}; //exports.getPedidosByEstado

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
}; //exports.getPedidosByEstado

///////////funciones
async function calcularDemora(pedidoDTO, platosPedido) {
  let demora = 0;
  //10 minutos si va por delivery, 0 si se retira en local
  let promise = new Promise((resolve, reject) => {
    resolve(pedidoDTO.delivery ? 10 : 0);
  });
  //Los 10 minutos deberían sumarse en otro lado ya que cuando está en
  //delivery no afecta al tiempo de cocina de los demas platos

  demora += await promise;
  logWarning(demora);

  //Demora de los platos del pedido
  for (const platoP of platosPedido) {
    promise = new Promise((resolve, reject) => {
      platosDB
        .getPlatoById(platoP.item_id)
        .then((plato) => {
          logWarning(plato.tiempoCocina);
          resolve(plato.tiempoCocina * platoP.cantidad);
        })
        .catch((error) => {
          logError(error);
          reject(0);
        });
    }); //promise
    demora += await promise;
  } //for()

  //Demora de los pedidos en cola
  promise = new Promise((resolve, reject) => {
    pedidosDB
      .getPedidosPendientesAnteriores(pedidoDTO.fecha)
      .then((pedidos) => {
        let demoraCola = 0;
        for (const pedido of pedidos) {
          demoraCola += pedido.minutosDemora;
        } //for()
        logWarning(demoraCola);
        resolve(demoraCola);
      })
      .catch((error) => {
        logError(error);
        reject(0);
      });
  }); //promise
  demora += await promise;

  //asigno la demora calculada a minutosDemora
  pedidoDTO.minutosDemora = demora;
} //calcularDemora()

async function calcularCosto(pedidoDTO, pedidoData) {
  let costo = 0;

  //Calcular costo de los platos
  for (const platoPD of pedidoData.platos) {
    promise = new Promise((resolve, reject) => {
      platosDB
        .getPlatoById(platoPD.item_id)
        .then((plato) => {
          logWarning(plato.precioVenta);
          resolve(plato.precioVenta * platoPD.cantidad);
        })
        .catch((error) => {
          logError(error);
          reject(0);
        });
    }); //promise
    costo += await promise;
  } //for()

  //Calcular costo de los articulos de reventa
  for (const reventaPD of pedidoData.reventas) {
    promise = new Promise((resolve, reject) => {
      reventasDB
        .getReventaById(reventaPD.item_id)
        .then((reventa) => {
          logWarning(reventa.precioVenta);
          resolve(reventa.precioVenta * reventaPD.cantidad);
        })
        .catch((error) => {
          logError(error);
          reject(0);
        });
    }); //promise
    costo += await promise;
  } //for()

  //Asigno descuento si corresponde (en caso de retiro en local)
  if (!pedidoDTO.delivery) {
    costo *= 0.9;
  }
  //asigno el costo calculado al total del pedido
  pedidoDTO.total = costo;
}
