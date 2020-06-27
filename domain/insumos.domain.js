const insumosDB = require("../db/insumos.db");

exports.createInsumo = (insumoData) => {
  return new Promise((resolve, reject) => {
    insumosDB
      .saveInsumo(insumoData)
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        console.log("Error -> insumos.domain -> createInsumo -> " + err);
        reject(err);
      });
  });
}; //exports.createInsumo

exports.getInsumos = () => {
  return new Promise((resolve, reject) => {
    insumosDB
      .getInsumos()
      .then((insumos) => {
        resolve(insumos);
      })
      .catch((err) => {
        console.log("Error -> insumos.domain -> getInsumos -> " + err);
        reject(err);
      });
  });
}; //exports.getInsumos

exports.getInsumoById = (insumoId) => {
  return new Promise((resolve, reject) => {
    insumosDB.getInsumoById(insumoId)
    .then((insumo) => {
      resolve(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.domain -> getInsumoById ->" + err);
      reject(err);
    });
  })
}//exports.getInsumoById

exports.updateInsumo = (id, insumoData) => {
  return new Promise((resolve, reject) => {
    insumosDB
      .updateInsumo(id, insumoData)
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        console.log("Error -> insumos.domain -> updateInsumo " + err);
        reject(err);
      });
  });
}; //exports.updateInsumo

exports.setBorradoInsumo = (id, borrado) => {
  return new Promise((resolve, reject) => {
    insumosDB
      .setBorradoInsumo(id, borrado)
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        console.log("Error -> insumos.domain -> setBorradoInsumo -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoInsumo

exports.hardDeleteInsumo = (id) => {
  return new Promise((resolve, reject) => {
  insumosDB
    .hardDeleteInsumo(id)
    .then((insumo) => {
      resolve(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.domain -> hardDeleteInsumo -> " + err);
      reject(err);
    });
  })
}; //exports.hardDeleteInsumo
