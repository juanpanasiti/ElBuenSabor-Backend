const mongoose = require("mongoose");
require("../models/ArticuloInsumo");

//Registrar Schema
const Insumo = mongoose.model("Insumo");

exports.Insumo = Insumo;

//Crear
exports.saveInsumo = (insumoData) => {
  return new Promise((resolve, reject) => {
    const insumo = new Insumo(insumoData);
    insumo
      .save()
      .then((insumo) => {
        console.log("Insumo guardado");
        resolve(insumo);
      })
      .catch((err) => {
        console.log("Error -> insumos.db -> saveRubro -> " + err);
        reject(err);
      });
  });
}; //exports.saveInsumo

//Obtener no borrados
exports.getInsumos = () => {
  return new Promise((resolve, reject) => {
    Insumo.find({borrado: false})
      .then((insumos) => {
        console.log(`Encontrados ${insumos.length} insumos`);
        resolve(insumos);
      })
      .catch((err) => {
        console.log("Error -> insumos.db -> getInsumos -> " + err);
        reject(err);
      });
  });
}; //exports.getInsumos

//Obtener borrados

//Obtener por rubros ???

//Obtener uno
exports.getInsumoById = (insumoId) => {
  return new Promise((resolve, reject) => {
    Insumo.findById(insumoId)
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        console.log("Error -> insumos.db -> getInsumoById -> " + err);
        reject(err);
      });
  });
}; //exports.getInsumoById

//Actualizar uno
exports.updateInsumo = (id, insumoData) => {
  return new Promise((resolve, reject) => {
    Insumo.findByIdAndUpdate(id, insumoData, { new: true })
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        console.log("Error -> insumos.db -> updateInsumo " + err);
        reject(err);
      });
  });
}; //exports.updateInsumo

//Borrado lógico de uno
exports.setBorradoInsumo = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Insumo.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
          console.log("Error -> insumos.db -> setBorradoInsumo -> " + err);
        reject(err);
      });
  });
};//exports.setBorradoInsumo


//Borrado físico de uno
  exports.hardDeleteInsumo = (id) => {
    return new Promise((resolve, reject) => {
      Insumo.findByIdAndDelete({ _id: id })
        .then((insumo) => {
          resolve(insumo);
        })
        .catch((err) => {
            console.log("Error -> insumos.db -> hardDeleteInsumo -> " + err);
          reject(err);
        });
    });
  }; //exports.hardDeleteInsumo
