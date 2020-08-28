const rubrosDB = require("../data/db/rubros.db");
const insumosDB = require("../data/db/insumos.db");
const reventasDB = require("../data/db/reventas.db");
const platosDB = require("../data/db/platos.db");

const { logError, logWarning } = require("../config/logger.config");

exports.createRubro = (rubroData) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .saveRubro(rubroData)
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error en rubro.domain -> createRubro " + err);
        reject(err);
      });
  });
}; //exports.createRubro

exports.getRubrosPorPadre = (idPadre) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .getRubrosPorPadre(idPadre)
      .then((rubros) => {
        resolve(rubros);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> getRubrosPorPadre -> " + err);
        reject(err);
      });
  });
};

exports.getRubros = (borrado) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .getRubros(borrado)
      .then((rubros) => {
        resolve(rubros);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> getRubros -> " + err);
        reject(err);
      });
  });
}; //exports.getRubros

exports.getRubrosPorTipo = (esDeInsumo) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .getRubrosPorTipo(esDeInsumo)
      .then((rubros) => {
        resolve(rubros);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> getRubrosPorTipo -> " + err);
        reject(err);
      });
  });
}; //exports.getRubros

//Obtener todos los artículos de un rubro
exports.getArticulos = async (rubroId) => {
  try {
    const rubro = await rubrosDB.getRubro(rubroId);
  const articulos = [];

  if (rubro.esRubroInsumo) {
    const insumos = await insumosDB.getInsumosPorRubro(rubroId);
    for (let insumo of insumos) {
      insumo.tipo = "insumo";
      logWarning(insumo.tipo)
      articulos.push(insumo);
      logWarning(articulos[0].tipo)
    }
  } else {
    //cargar articulos de reventa
    const reventas = await reventasDB.getReventasPorRubro(rubroId);
    for (const reventa of reventas) {
      reventa.tipo = "reventa";
      articulos.push(reventa);
    }

    //cargar articulos de reventa
    const platos = await platosDB.getPlatosPorRubro(rubroId);
    for (const plato of platos) {
      plato.tipo = "plato";
      articulos.push(plato);
    }
  }
  return Promise.resolve(articulos)
  } catch (error) {
    Promise.reject(error)
  }
}; //getArticulos

exports.getRubro = (id) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .getRubro(id)
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> getRubro -> " + err);
        reject(err);
      });
  });
}; //exports.getRubro

exports.updateRubro = (id, rubroData) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .updateRubro(id, rubroData)
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> updateRubro " + err);
        reject(err);
      });
  });
}; //exports.updateRubro

exports.setBorradoRubro = (id, borrado) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .setBorradoRubro(id, borrado)
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> setBorradoRubro -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoRubro

exports.hardDeleteRubro = (id) => {
  return new Promise((resolve, reject) => {
    rubrosDB
      .hardDeleteRubro(id)
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubro.domain -> hardDeleteRubro -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteRubro
