const insumosDB = require("../data/db/insumos.db");
const { logError } = require("../config/logger.config");

exports.createInsumo = (insumoData) => {
  return new Promise((resolve, reject) => {
    insumosDB
      .saveInsumo(insumoData)
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        logError("Error -> insumos.services -> createInsumo -> " + err);
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
        logError("Error -> insumos.services -> getInsumos -> " + err);
        reject(err);
      });
  });
}; //exports.getInsumos

exports.getInsumosPorRubro = (rubroId) => {
  return new Promise((resolve,reject) => {
    insumosDB.getInsumosPorRubro(rubroId)
    .then((insumos) => {
      resolve(insumos)
    })
    .catch((error) => {
      logError("Error -> insumos.services -> getInsumosPorRubro -> " + error);
      reject(error)
    })
  })
}//getInsumosParaComprar

exports.getInsumoById = (insumoId) => {
  return new Promise((resolve, reject) => {
    insumosDB.getInsumoById(insumoId)
    .then((insumo) => {
      resolve(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.services -> getInsumoById ->" + err);
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
        logError("Error -> insumos.services -> updateInsumo " + err);
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
        logError("Error -> insumos.services -> setBorradoInsumo -> " + err);
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
      logError("Error -> insumos.services -> hardDeleteInsumo -> " + err);
      reject(err);
    });
  })
}; //exports.hardDeleteInsumo
