const mongoose = require("mongoose");
const { logSuccess, logError, logInfo, logWarning } = require("../../config/logger.config");
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
        logSuccess(`Insumo '${insumo.denominacion}' guardado.`);
        resolve(insumo);
      })
      .catch((err) => {
        logError("Error -> insumos.db -> saveRubro -> " + err);
        reject(err);
      });
  });
}; //exports.saveInsumo

//Obtener no borrados
exports.getInsumos = () => {
  return new Promise((resolve, reject) => {
    Insumo.find({ borrado: false })
      .populate("rubro")
      .then((insumos) => {
        logInfo(`Encontrados ${insumos.length} insumos`);
        resolve(insumos);
      })
      .catch((err) => {
        logError("Error -> insumos.db -> getInsumos -> " + err);
        reject(err);
      });
  });
}; //exports.getInsumos

//Obtener insumos con stock menor al mínimo
exports.getInsumosParaComprar = () => {
  return new Promise((resolve, reject) => {
    logInfo('Buscando Insumos para comprar')
    Insumo.find({$where: function() {
      return(this.stockActual < this.stockMinimo)
    }})
      .populate("rubro")
      .then((insumos) => {
        logInfo(`Encontrados ${insumos.length} insumos.`)
        resolve(insumos);
      })
      .catch((error) => {
        logError("Error -> insumos.db -> getInsumosParaComprar -> " + error);
        reject(error);
      });
  });
}; //getInsumosParaComprar

//Obtener por rubros ???

//Obtener uno
exports.getInsumoById = (insumoId) => {
  return new Promise((resolve, reject) => {
    Insumo.findById(insumoId)
      .populate("rubro")
      .then((insumo) => {
        logInfo(`Encontrado el insumo '${insumo.denominacion}'`);
        resolve(insumo);
      })
      .catch((err) => {
        logError("Error -> insumos.db -> getInsumoById -> " + err);
        reject(err);
      });
  });
}; //exports.getInsumoById

//Actualizar uno
exports.updateInsumo = (id, insumoData) => {
  return new Promise((resolve, reject) => {
    Insumo.findByIdAndUpdate(id, insumoData, { new: true })
      .then((insumo) => {
        logSuccess(`Actualizado el insumo '${insumo.denominacion}'`);
        resolve(insumo);
      })
      .catch((err) => {
        logError("Error -> insumos.db -> updateInsumo " + err);
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
        logError("Error -> insumos.db -> setBorradoInsumo -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoInsumo

//Borrado físico de uno
exports.hardDeleteInsumo = (id) => {
  return new Promise((resolve, reject) => {
    Insumo.findByIdAndDelete({ _id: id })
      .then((insumo) => {
        resolve(insumo);
      })
      .catch((err) => {
        logError("Error -> insumos.db -> hardDeleteInsumo -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteInsumo

//Sumar o restar una cantidad al stock
exports.updateStock = (id,cantidad,esIngreso) => {
  return new Promise((resolve,reject) => {
    Insumo.findById(id)
    .then((insumo) => {
      if(esIngreso){
        logWarning("Se va a agregar stock")
        insumo.stockActual += cantidad
      } else {
        logWarning("Se va a restar stock")
        insumo.stockActual -= cantidad
      }
      return this.updateInsumo(insumo._id,insumo)
    })
    .then((insumoActualizado) => {
      logSuccess(`Stock actualizado del insumo ${insumoActualizado.denominacion}`)
      resolve(insumoActualizado)
    })
    .catch((error) => {
      logError("Error -> insumos.db -> updateStock -> " + error);
        reject(error);
    })
  })
}