const detallesDB = require("../data/db/detallesPedidos.db");
const platoDB = require("../data/db/platos.db")
const reventaDB = require('../data/db/reventas.db')
const { newDetallePedidoDTO } = require("../data/dto/detallePedido.dto");
const { logInfo } = require("../config/logger.config");

exports.createDetalle = (pedidoData) => {
  const detalleDTO = newDetallePedidoDTO()
  detalleDTO.subtotal = 0.0
  return new Promise((resolve, reject) => {

    for(plato of pedidoData.platos){
      detalleDTO.platos.push(plato)
      platoDB.getPlatoById(plato.item_id)
      .then((plato) => {
        logInfo(plato.precioVenta)
        detalleDTO.subtotal += plato.precioVenta
        logInfo(detalleDTO)
      })
      .catch((error) => {
        reject(error)
      })
      //detalleDTO.subtotal += 
    }
    for(reventa of pedidoData.reventas){
  
      detalleDTO.reventas.push(reventa)
    }
    
    logInfo(detalleDTO.reventas[0])
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
        console.log("Error -> detallesPedidos.domain -> getDetalleById ->" + err);
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
