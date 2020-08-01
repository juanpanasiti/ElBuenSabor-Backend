const pedidosDB = require("../data/db/pedidos.db");
const platosDB = require("../data/db/platos.db");
const reventasDB = require("../data/db/reventas.db");
const insumosDB = require("../data/db/insumos.db");
const detallePedidoService = require("./detallesPedidos.services");
const facturaService = require("./facturas.services");
const usuarioService = require("./usuarios.services");
const { logInfo, logWarning, logError, logSuccess } = require("../config/logger.config");
const { newPedidoDTO } = require("../data/dto/pedido.dto");
const { estadoPedido } = require("../data/static/models.options.statics");

exports.createPedido = async (pedidoData) => {
  const pedidoDTO = newPedidoDTO();
  //Llenar datos al DTO
  pedidoDTO.fecha = Date.now();
  pedidoDTO.estado = estadoPedido()[1].toLowerCase();
  pedidoDTO.delivery = pedidoData.delivery;
  pedidoDTO.formaPago = pedidoData.formaPago;
  pedidoDTO.usuario = pedidoData.usuario;
  pedidoDTO.domicilio = pedidoData.domicilio;

  //Si el pedido es con delivery y el pago es distinto de efectivo, rechazar
  if (pedidoDTO.delivery && pedidoDTO.formaPago.toLowerCase() !== "efectivo") {
    logWarning("Envios por delivery solo aceptan pago en efectivo");
    return Promise.reject({
      messasge: "Envios con delivery solo aceptan pago en efectivo.",
    });
  }
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

exports.getPedidosUsuario = (usuarioId) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidosUsuario(usuarioId)
      .then((pedidos) => {
        resolve(pedidos);
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> getPedidos -> " + err);
        reject(err);
      });
  });
}; //exports.getPedidos

exports.downloadFactura = (pedidoId) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidoById(pedidoId)
      .then((pedido) => {
        if (pedido.factura) {
          logInfo(`Factura localizada en: ${pedido.factura}`);
          resolve(pedido.factura);
        } else {
          logError(
            "No hay una factura generada o no se guardó la ruta: " + pedido.factura
          );
          reject({ message: "No existe factura generada." });
        }
      })
      .catch((err) => {
        console.log("Error -> pedidos.domain -> getPedidoById ->" + err);
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

exports.updateEstadoPedido = (id, estado) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidoById(id)
      .then((pedido) => {
        const edoAnterior = pedido.estado;
        const edoSiguiente = estado;
        const edoCancelado = estadoPedido()[0].toLowerCase();
        const edoPendiente = estadoPedido()[1].toLowerCase();
        const edoAprobado = estadoPedido()[2].toLowerCase();
        const edoEnProceso = estadoPedido()[3].toLowerCase();
        const edoPreparado = estadoPedido()[4].toLowerCase();
        const edoEnDelivery = estadoPedido()[5].toLowerCase();
        const edoEntregado = estadoPedido()[6].toLowerCase();

        let continuar = true;

        //Un pedido 'cancelado' no puede cambiar de estado
        if (edoAnterior === edoCancelado) {
          continuar = false;
          reject({
            message: "Un pedido cancelado está en estado final y no se puede cambiar",
          });
        }

        //Un pedido 'Pendiente' solo puede pasar a 'aprobado' o 'cancelado'
        if (
          edoAnterior === edoPendiente &&
          edoSiguiente !== edoAprobado &&
          edoSiguiente !== edoCancelado
        ) {
          continuar = false;
          reject({
            message: "Un pedido pendiente sólo puede ser aprobado o cancelado",
          });
        }

        //Un pedido 'aprobado' solo puede cambiar a 'en proceso' o 'cancelado'
        if (
          edoAnterior === edoAprobado &&
          edoSiguiente !== edoEnProceso &&
          edoSiguiente !== edoCancelado
        ) {
          continuar = false;
          reject({
            message: "Un pedido aprobado sólo puede pasar a estar en proceso o cancelado",
          });
        }

        //Un pedido 'en proceso' solo puede cambiar a 'preparado' o 'cancelado'
        if (
          edoAnterior === edoEnProceso &&
          edoSiguiente !== edoPreparado &&
          edoSiguiente !== edoCancelado
        ) {
          continuar = false;
          reject({
            message:
              "Un pedido en proceso sólo puede pasar a estar preparado o cancelado",
          });
        }

        //Un pedido 'preparado', con envio por deliveri solo puede cambiar a 'en delivery' o 'cancelado'
        if (
          edoAnterior === edoPreparado &&
          edoSiguiente !== edoEnDelivery &&
          pedido.delivery &&
          edoSiguiente !== edoCancelado
        ) {
          continuar = false;
          reject({
            message:
              "Un pedido preparado con envió a domicilio sólo puede pasar a estar en delivery o cancelado",
          });
        }

        //Un pedido 'preparado', retiro en local solo puede cambiar a 'entregado' o 'cancelado'
        if (
          edoAnterior === edoPreparado &&
          edoSiguiente !== edoEntregado &&
          !pedido.delivery &&
          edoSiguiente !== edoCancelado
        ) {
          continuar = false;
          reject({
            message:
              "Un pedido preparado con retiro en local sólo puede pasar a estar en delivery o cancelado",
          });
        }

        //Un pedido 'en delivery' solo puede cambiar a 'entregado' o 'cancelado'
        if (
          edoAnterior === edoEnDelivery &&
          edoSiguiente !== edoEntregado &&
          edoSiguiente !== edoCancelado
        ) {
          continuar = false;
          reject({
            message:
              "Un pedido en delivery sólo puede pasar a estar entregado o cancelado",
          });
        }

        //Un pedido 'entregado' no puede cambiar de estado
        // if (edoAnterior === edoEntregado) {
        //   continuar = false;
        //   reject({
        //     message: "Un pedido entregado está en estado final y no se puede cambiar",
        //   });
        // }
        if (continuar) {
          pedido.estado = estado;
          pedidosDB
            .updatePedido(pedido._id, pedido)
            .then((pedido) => {
              if (estado === edoPreparado) {
                logWarning(
                  `Pasa al estado '${edoPreparado}', se va a actualizar el stock.`
                );
                actualizarStock(pedido);
              } else if (estado === edoEntregado) {
                logWarning(
                  `Pasa al estado '${edoEntregado}', se va a generar la factura.`
                );
                this.facturarPedido(pedido._id).then((facturaUrl) => {
                  logInfo("ARCHIVO: " + facturaUrl.filename);
                  pedido.factura = facturaUrl.filename.toString();
                  return this.updatePedido(pedido._id, pedido);
                });
              }
              resolve(pedido);
            })

            .then((pedido) => {
              logInfo(pedido);
              resolve(pedido);
            })
            .catch((error) => {
              logError(`Error interno: ${error}`);
              reject(error);
            });
        }
      }) //then()
      .catch((error) => {
        logError(`Error externo: ${error}`);
        reject(error);
      });
  });
}; //exports.updatePedido

exports.facturarPedido = (id) => {
  return new Promise((resolve, reject) => {
    pedidosDB
      .getPedidoById(id)
      .then((pedido) => {
        return facturaService.crearFactura(pedido);
      })
      .then((factura) => {
        resolve(factura);
      })
      .catch((error) => {
        logError(`Error al facturar ${error}`);
        reject(error);
      });
  });
};

///////////funciones
async function calcularDemora(pedidoDTO, platosPedido) {
  let demora = 0;
  let cocineros = 1;
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
        resolve(demoraCola);
      })
      .catch((error) => {
        logError(error);
        reject(0);
      });
  }); //promise
  demora += await promise;
  //dividir por cantidad de cocineros
  promise = new Promise((resolve, reject) => {
    usuarioService
      .getUsuarioByRol("Cocinero")
      .then((cocineros) => {
        logInfo(`Hay ${cocineros.length} cocineros`);
        resolve(cocineros.length);
      })
      .catch((error) => {
        logError(error);
        reject(1);
      });
  }); //promise
  cocineros = await promise;
  cocineros = cocineros === 0 ? 1 : cocineros; //evito problema al dividir por cero
  logInfo(`demora antes ${demora}`);
  demora = demora / cocineros;
  logInfo(`demora despues ${demora}`);

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

///Actualizar stock de los artículos del pedido
async function actualizarStock(pedido) {
  const detalle = await detallePedidoService.getDetalleById(pedido.detalle);

  //Actualizar stock de ingredientes
  for (const platoDetalle of detalle.platos) {
    const plato = await platosDB.getPlatoById(platoDetalle.item_id);
    logInfo(`Actualizar stock de insumos del plato ${plato.denominacion}`);
    for (const ingrediente of plato.ingredientes) {
      insumosDB.updateStock(
        ingrediente.insumo,
        platoDetalle.cantidad * ingrediente.cantidad,
        false
      );
    }
  } //for-platos

  //Actualizar stock de reventas
  for (const reventaDetalle of detalle.reventas) {
    reventasDB.updateStock(reventaDetalle.item_id, reventaDetalle.cantidad, false);
  }
}
