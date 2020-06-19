//const db_tools = require("../tools/db_tools");
const mongoose = require("mongoose");
require("../models/Rubro");

//Conectar la base de datos
//const db = db_tools.getDBConexion();

//Registrar Schema
const Rubro = mongoose.model("Rubro");

exports.Rubro = Rubro;
//Guardar
exports.saveRubro = (rubroData) => {
return new Promise((resolve, reject) => {
    const rubro = new Rubro(rubroData);
    rubro
      .save()
      .then((rubro) => {
        console.log("Rubro guardado");
        resolve(rubro);
      })
      .catch((err) => {
        console.log("Error en rubros.db al guardar " + err);
        reject(err);
      });
  });
}; //exports.saveRubro

//Obtener rubros raíz (sin padre)
exports.getRubrosPorPadre = (idPadre) => {
  return new Promise((resolve, reject) => {
    Rubro.find({ rubroPadre: idPadre, borrado: false }).populate('Rubro')
      .then((rubros) => {
        console.log(`Encontrados ${rubros.length} rubros`);
        resolve(rubros);
      })
      .catch((err) => {
        console.log("Error obteniendo rubros en roles.db " + err);
        reject(err);
      });
  });
};

//obtener varios segun si está borrado o no
exports.getRubros = (estaBorrado) => {
  return new Promise((resolve, reject) => {
    Rubro.find({ borrado: estaBorrado })
      .then((rubros) => {
        console.log(`Encontrados ${rubros.length} rubros`);
        resolve(rubros);
      })
      .catch((err) => {
        console.log("Error obteniendo rubros en roles.db " + err);
        reject(err);
      });
  });
}; //exports.getRubros

//obtener varios segun si es de insumo o de catálogo
exports.getRubrosPorTipo = (esDeInsumo) => {
  return new Promise((resolve, reject) => {
    Rubro.find({ esRubroInsumo: esDeInsumo, borrado: false })
      .then((rubros) => {
        console.log(`Encontrados ${rubros.length} rubros`);
        resolve(rubros);
      })
      .catch((err) => {
        console.log("Error obteniendo rubros en roles.db " + err);
        reject(err);
      });
  });
}; //exports.getRubrosPorTipo

//Obtener un rubro por ID
exports.getRubro = (id) => {
  return new Promise((resolve, reject) => {
    Rubro.findById(id)
      .then((rubro) => {
        console.log(`Encontrado el rubro ${rubro.denominacion}.`);
        resolve(rubro);
      })
      .catch((err) => {
        reject(err);
      });
  });
}; //exports.getRubro

exports.updateRubro = (id, rubroData) => {
  return new Promise((resolve, reject) => {
    Rubro.findByIdAndUpdate(id, rubroData, { new: true })
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        console.log("Error en rubro.db -> updateRubro " + err);
        reject(err);
      });
  });
}; //exports.updateRubro

exports.setBorradoRubro = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Rubro.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        reject(err);
      });
  });
};//exports.setBorradoRubro

exports.hardDeleteRubro = (id) => {
  return new Promise((resolve, reject) => {
    Rubro.findByIdAndDelete({ _id: id })
      .then((rubro) => {
        resolve(rubro);
      })
      .catch((err) => {
        reject(err);
      });
  });
}; //exports.hardDeleteRubro
