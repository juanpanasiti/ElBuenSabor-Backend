const mongoose = require("mongoose");
const utils = require("../../config/logger.config");
const {
  logError,
  logSuccess,
  logInfo,
  logWarning,
} = require("../../config/logger.config");
require("../models/Plato");

//Registrar Schema
const Plato = mongoose.model("Plato");

exports.Plato = Plato;

//Crear
exports.savePlato = (platoData) => {
  return new Promise((resolve, reject) => {
    const plato = new Plato(platoData);
    plato
      .save()
      .then((plato) => {
        logSuccess(`Plato ${plato.denominacion} guardado.`);
        resolve(plato);
      })
      .catch((err) => {
        logError("Error -> platos.db -> savePlato -> " + err);
        reject(err);
      });
  });
}; //exports.savePlato

//Obtener no borrados
exports.getPlatos = () => {
  return new Promise((resolve, reject) => {
    Plato.find({ borrado: false })
      .populate({
        path: "ingredientes",
        populate: { path: "insumo", select: "_id denominacion unidadMedida" },
      })
      .populate("rubro", "_id denominacion")
      .then((platos) => {
        logInfo(`Encontrados ${platos.length} platos`);
        resolve(platos);
      })
      .catch((err) => {
        logError("Error -> platos.db -> getPlatos -> " + err);
        reject(err);
      });
  });
}; //exports.getPlatos

//Obtener uno
exports.getPlatoById = (id) => {
  return new Promise((resolve, reject) => {
    Plato.findById(id)
      .populate({
        path: "ingredientes",
        populate: { path: "insumo", select: "_id denominacion unidadMedida" },
      })
      .populate("rubro", "_id denominacion")
      .then((plato) => {
        resolve(plato);
      })
      .catch((err) => {
        logError("Error -> platos.db -> getPlatoById -> " + err);
        reject(err);
      });
  });
}; //exports.getPlatoById

//Actualizar uno
exports.updatePlato = (id, platoData) => {
  return new Promise((resolve, reject) => {
    Plato.findByIdAndUpdate(id, platoData, { new: true })
      .then((plato) => {
        resolve(plato);
      })
      .catch((err) => {
        logError("Error -> platos.db -> updatePlato " + err);
        reject(err);
      });
  });
}; //exports.updatePlato

//Borrado lógico de uno
exports.setBorradoPlato = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Plato.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((plato) => {
        resolve(plato);
      })
      .catch((err) => {
        logError("Error -> platos.db -> setBorradoPlato -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoPlato

//Borrado físico de uno
exports.hardDeletePlato = (id) => {
  return new Promise((resolve, reject) => {
    Plato.findByIdAndDelete({ _id: id })
      .then((plato) => {
        resolve(plato);
      })
      .catch((err) => {
        logError("Error -> platos.db -> hardDeletePlato -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeletePlato

///Metodos para implementar relaciones
//Agregar ID de ingrediente a la lista de ingredientes del plato
exports.addIngrediente = (ingredienteId, platoId) => {
  return new Promise((resolve, reject) => {
    this.getPlatoById(platoId)
      .then((plato) => {
        logWarning(plato);
        plato.ingredientes.push(ingredienteId);
        logSuccess("Agregado ingrediente a " + plato.denominacion);
        this.updatePlato(platoId, plato)
          .then((platoEd) => {
            resolve(platoEd);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //exports.addIngrediente

//Remover ID de ingrediente de la lista de ingredientes del plato
exports.removeIngrediente = (ingredienteId, platoId) => {
  return new Promise((resolve, reject) => {
    this.getPlatoById(platoId)
      .then((plato) => {
        const ingredientes = utils.removeItemFromList(plato.ingredientes, ingredienteId);
        plato.ingredientes = ingredientes;
        this.updatePlato(platoId, plato)
          .then((platoEd) => {
            resolve(platoEd);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //exports.removeIngrediente

// exports.removeItemFromList = (ingedientesPlato, ingredienteId) => {
//   let ingredientes = [];
//   for (let ingrediente of ingedientesPlato) {
//     if (ingrediente != ingredienteId.toString()) {
//       ingredientes.push(ingrediente);
//     }
//   }
//   return ingredientes;
// };
