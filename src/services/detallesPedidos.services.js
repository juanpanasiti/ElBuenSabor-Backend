const detallesDB = require("../data/db/detallesPedidos.db");
const platosDB = require("../data/db/platos.db");
const reventasDB = require("../data/db/reventas.db");
const { newDetallePedidoDTO } = require("../data/dto/detallePedido.dto");
const {
  logInfo,
  logError,
  logWarning,
  logSuccess,
} = require("../config/logger.config");

exports.createDetalle = async (pedidoData, pedidoID) => {
  const detalleDTO = newDetallePedidoDTO();
  detalleDTO.pedido = pedidoID;
  detalleDTO.subtotal = 0.0;
  detalleDTO.platos = pedidoData.platos;
  detalleDTO.reventas = pedidoData.reventas;

  //Calcular costo del pedido
  await calcularCosto(detalleDTO, pedidoData);

  return new Promise((resolve, reject) => {
    detallesDB
      .saveDetalle(detalleDTO)
      .then((detalleG) => {
        logSuccess(detalleG);
        resolve(detalleG);
      })
      .catch((error) => {
        logError(`detallesPedidos.services -> createDetalle() -> ${error}`);
        reject(error);
      });
  });
}; //exports.createDetalle

exports.getDetalles = () => {
  return new Promise((resolve, reject) => {
    detallesDB
      .getDetalles()
      .then((detalles) => {
        resolve(detalles);
      })
      .catch((err) => {
        console.log("Error -> detallesPedidos.domain -> getDetalles -> " + err);
        reject(err);
      });
  });
}; //exports.getDetalles

exports.getDetalleById = (id) => {
  return new Promise((resolve, reject) => {
    detallesDB
      .getDetalleById(id)
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        console.log(
          "Error -> detallesPedidos.domain -> getDetalleById ->" + err
        );
        reject(err);
      });
  });
}; //exports.getDetalleById

exports.updateDetalle = (id, detalleData) => {
  return new Promise((resolve, reject) => {
    detallesDB
      .updateDetalle(id, detalleData)
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        console.log("Error -> detallesPedidos.domain -> updateDetalle " + err);
        reject(err);
      });
  });
}; //exports.updateDetalle

exports.setBorradoDetalle = (id, borrado) => {
  return new Promise((resolve, reject) => {
    detallesDB
      .setBorradoDetalle(id, borrado)
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        console.log(
          "Error -> detallesPedidos.domain -> setBorradoDetalle -> " + err
        );
        reject(err);
      });
  });
}; //exports.setBorradoDetalle

exports.hardDeleteDetalle = (id) => {
  return new Promise((resolve, reject) => {
    detallesDB
      .hardDeleteDetalle(id)
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        console.log(
          "Error -> detallesPedidos.domain -> hardDeleteDetalle -> " + err
        );
        reject(err);
      });
  });
}; //exports.hardDeleteDetalle

/////////////////////////////////
async function calcularCosto(detalleDTO, pedidoData) {
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
  //asigno el costo calculado al total del pedido
  detalleDTO.subtotal = costo;
}
