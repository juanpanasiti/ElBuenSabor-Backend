const reventasDB = require("../data/db/reventas.db");

exports.createReventa = (reventaData) => {
  return new Promise((resolve, reject) => {
    reventasDB
      .saveReventa(reventaData)
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.domain -> createReventa -> " + err);
        reject(err);
      });
  });
}; //exports.createReventa

exports.getReventas = () => {
  return new Promise((resolve, reject) => {
    reventasDB
      .getReventas()
      .then((reventas) => {
        resolve(reventas);
      })
      .catch((err) => {
        console.log("Error -> reventas.domain -> getReventas -> " + err);
        reject(err);
      });
  });
}; //exports.getReventas

exports.getReventaById = (reventaId) => {
  return new Promise((resolve, reject) => {
    reventasDB
      .getReventaById(reventaId)
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.domain -> getReventaById ->" + err);
        reject(err);
      });
  });
}; //exports.getReventaById

exports.updateReventa = (id, reventaData) => {
  return new Promise((resolve, reject) => {
    reventasDB
      .updateReventa(id, reventaData)
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.domain -> updateReventa " + err);
        reject(err);
      });
  });
}; //exports.updateReventa

exports.setBorradoReventa = (id, borrado) => {
  return new Promise((resolve, reject) => {
    reventasDB
      .setBorradoReventa(id, borrado)
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.domain -> setBorradoReventa -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoReventa

exports.hardDeleteReventa = (id) => {
  return new Promise((resolve, reject) => {
    reventasDB
      .hardDeleteReventa(id)
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.domain -> hardDeleteReventa -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteReventa
