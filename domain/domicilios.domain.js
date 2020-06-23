const domiciliosDB = require("../db/domicilios.db");

exports.createDomicilio = (domicilioData) => {
  return new Promise((resolve, reject) => {
    domiciliosDB
      .saveDomicilio(domicilioData)
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.domain -> createDomicilio -> " + err);
        reject(err);
      });
  });
}; //exports.createDomicilio

exports.getDomicilios = () => {
  return new Promise((resolve, reject) => {
    domiciliosDB
      .getDomicilios()
      .then((domicilios) => {
        resolve(domicilios);
      })
      .catch((err) => {
        console.log("Error -> domicilios.domain -> getDomicilios -> " + err);
        reject(err);
      });
  });
}; //exports.getDomicilios

exports.getDomicilioById = (id) => {
  return new Promise((resolve, reject) => {
    domiciliosDB
      .getDomicilioById(id)
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.domain -> getDomicilioById ->" + err);
        reject(err);
      });
  });
}; //exports.getDomicilioById

exports.updateDomicilio = (id, domicilioData) => {
  return new Promise((resolve, reject) => {
    domiciliosDB
      .updateDomicilio(id, domicilioData)
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.domain -> updateDomicilio " + err);
        reject(err);
      });
  });
}; //exports.updateDomicilio

exports.setBorradoDomicilio = (id, borrado) => {
  return new Promise((resolve, reject) => {
    domiciliosDB
      .setBorradoDomicilio(id, borrado)
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log(
          "Error -> domicilios.domain -> setBorradoDomicilio -> " + err
        );
        reject(err);
      });
  });
}; //exports.setBorradoDomicilio

exports.hardDeleteDomicilio = (id) => {
  return new Promise((resolve, reject) => {
    domiciliosDB
      .hardDeleteDomicilio(id)
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log(
          "Error -> domicilios.domain -> hardDeleteDomicilio -> " + err
        );
        reject(err);
      });
  });
}; //exports.hardDeleteDomicilio
