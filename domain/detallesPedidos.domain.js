const detallesDB = require("../db/detalles.db");

exports.createDetalle = (detalleData) => {
  return new Promise((resolve, reject) => {
    detallesDB
      .saveDetalle(detalleData)
      .then((detalle) => {
        resolve(detalle);
      })
      .catch((err) => {
        console.log("Error -> detallesPedidos.domain -> createDetalle -> " + err);
        reject(err);
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
