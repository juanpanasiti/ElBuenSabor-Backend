const mongoose = require("mongoose");
const { logError, logSuccess } = require("../../config/logger.config");
require("../models/Rubro");

//Registrar Schema
const Rubro = mongoose.model("Rubro");

exports.Rubro = Rubro;

//Guardar
exports.saveRubro = (rubroData) => {
  return new Promise((resolve, reject) => {
    if(rubroData.rubroPadre === ""){
      rubroData.rubroPadre = null
    }
    const rubro = new Rubro(rubroData);
    rubro
      .save()
      .then((rubro) => {
        logSuccess("Rubro guardado con id: " + rubro._id);
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> saveRubro() -> " + err);
        reject(err);
      });
  });
}; //exports.saveRubro

//Obtener rubros raíz (sin padre)
exports.getRubrosPorPadre = (idPadre) => {
  return new Promise((resolve, reject) => {
    Rubro.find({ rubroPadre: idPadre, borrado: false })
      .populate("rubroPadre")
      .then((rubros) => {
        logSuccess(`Encontrados ${rubros.length} rubros`);
        resolve(rubros);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> getRubrosPorPadre() -> " + err);
        reject(err);
      });
  });
};

//obtener varios segun si está borrado o no
exports.getRubros = (estaBorrado) => {
  return new Promise((resolve, reject) => {
    Rubro.find({ borrado: estaBorrado })
      .populate("rubroPadre")
      .then((rubros) => {
        logSuccess(`Encontrados ${rubros.length} rubros`);
        resolve(rubros);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> getRubros() -> " + err);
        reject(err);
      });
  });
}; //exports.getRubros

//obtener varios segun si es de insumo o de catálogo
exports.getRubrosPorTipo = (esDeInsumo) => {
  return new Promise((resolve, reject) => {
    Rubro.find({ esRubroInsumo: esDeInsumo, borrado: false })
      .populate("rubroPadre")
      .then((rubros) => {
        logSuccess(`Encontrados ${rubros.length} rubros`);
        resolve(rubros);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> getRubrosPorTipo() -> " + err);
        reject(err);
      });
  });
}; //exports.getRubrosPorTipo

//Obtener un rubro por ID
exports.getRubro = (id) => {
  return new Promise((resolve, reject) => {
    Rubro.findById(id)
      .populate("rubroPadre")
      .then((rubro) => {
        logSuccess(`Encontrado el rubro ${rubro.denominacion}.`);
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> getRubro() -> " + err);
        reject(err);
      });
  });
}; //exports.getRubro

//Actualizar
exports.updateRubro = (id, rubroData) => {
  return new Promise((resolve, reject) => {
    Rubro.findByIdAndUpdate(id, rubroData, { new: true })
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> updateRubro() -> " + err);
        reject(err);
      });
  });
}; //exports.updateRubro

//Borrado/Restaurado lógico
exports.setBorradoRubro = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Rubro.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> setBorradoRubro() -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoRubro

//Borrado físico de la base de datos
exports.hardDeleteRubro = (id) => {
  return new Promise((resolve, reject) => {
    Rubro.findByIdAndDelete({ _id: id })
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        logError("Error -> rubros.db -> hardDeleteRubro() -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteRubro
