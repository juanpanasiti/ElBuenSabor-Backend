const mongoose = require("mongoose");
require("../models/DetallePedido");
const pedidosDB = require("../db/pedidos.db");
const utils = require("../tools/utils.tools");

//Registrar Schema
const Detalle = mongoose.model("DetallePedido");

exports.Detalle = Detalle;

//Crear
exports.saveDetalle = (detalleData) => {
  return new Promise((resolve, reject) => {
    const detalle = new Detalle(detalleData);
    detalle
      .save()
      .then((detalle) => {
        //Agregar el ID del detalle a los detalles del pedido
        pedidosDB.addDetalle(detalle._id, detalle.pedido);
        resolve(detalle);
      })
      .catch((err) => {
        utils.logError("Error -> detallesPedidos.db -> saveDetalle -> " + err);
        reject(err);
      });
  });
}; //exports.saveDetalle

//Obtener no borrados
exports.getDetalles = () => {
  return new Promise((resolve, reject) => {
    Detalle.find({ borrado: false })
      .populate("pedido")
      .then((detalles) => {
        utils.logInfo(`Encontrados ${detalles.length} detalles de pedido`);
        resolve(detalles);
      })
      .catch((err) => {
        utils.logError("Error -> detallesPedidos.db -> getDetalles -> " + err);
        reject(err);
      });
  });
}; //exports.getDetalles

//Obtener uno
exports.getDetalleById = (id) => {
  return new Promise((resolve, reject) => {
    Detalle.findById(id)
      .populate("pedido")
      .populate("insumo")
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        utils.logError(
          "Error -> detallesPedidos.db -> getDetalleById -> " + err
        );
        reject(err);
      });
  });
}; //exports.getDetalleById

//Actualizar uno
exports.updateDetalle = (id, detalleData) => {
  return new Promise((resolve, reject) => {
    Detalle.findByIdAndUpdate(id, detalleData, { new: true })
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        utils.logError("Error -> detallesPedidos.db -> updateDetalle " + err);
        reject(err);
      });
  });
}; //exports.updateDetalle

//Borrado lógico de uno
exports.setBorradoDetalle = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Detalle.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((detalle) => {
        //Agregar o quitar el ID del detalle a los detalles del pedido
        if (borrado) {
          pedidosDB.removeDetalle(detalle._id, detalle.pedido);
        } else {
          pedidosDB.addDetalle(detalle._id, detalle.pedido);
        }
        resolve(detalle);
      })
      .catch((err) => {
        utils.logError(
          "Error -> detallesPedidos.db -> setBorradoDetalle -> " + err
        );
        reject(err);
      });
  });
}; //exports.setBorradoDetalle

//Borrado físico de uno
exports.hardDeleteDetalle = (id) => {
  return new Promise((resolve, reject) => {
    Detalle.findByIdAndDelete({ _id: id })
      .then((detalle) => {
        pedidosDB.removeDetalle(detalle._id, detalle.pedido);
        resolve(detalle);
      })
      .catch((err) => {
        utils.logError(
          "Error -> detallesPedidos.db -> hardDeleteDetalle -> " + err
        );
        reject(err);
      });
  });
}; //exports.hardDeleteDetalle
