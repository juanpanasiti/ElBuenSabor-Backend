const mongoose = require("mongoose");
require("../models/DetalleIngrediente");
const platosDB = require("../db/platos.db");
const { logError, logInfo, logSuccess } = require("../../config/logger.config");

//Registrar Schema
const Ingrediente = mongoose.model("DetalleIngrediente");

exports.Ingrediente = Ingrediente;

//Crear
exports.saveIngrediente = (ingredienteData) => {
  return new Promise((resolve, reject) => {
    const ingrediente = new Ingrediente(ingredienteData);
    ingrediente
      .save()
      .then((ingrediente) => {
        logInfo(`Agregado ingrediente en cantidad ${ingrediente.cantidad}`)
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.db -> saveIngrediente -> " + err);
        reject(err);
      });
  });
}; //exports.saveIngrediente

//Obtener no borrados
exports.getIngredientes = () => {
  return new Promise((resolve, reject) => {
    Ingrediente.find({ borrado: false })
      .populate("plato")
      .populate("insumo")
      .then((ingredientes) => {
        logInfo(`Encontrados ${ingredientes.length} ingredientes`);
        resolve(ingredientes);
      })
      .catch((err) => {
        logError("Error -> ingredientes.db -> getIngredientes -> " + err);
        reject(err);
      });
  });
}; //exports.getIngredientes

//Obtener uno
exports.getIngredienteById = (id) => {
  return new Promise((resolve, reject) => {
    Ingrediente.findById(id)
      .populate("plato")
      .populate("insumo")
      .then((ingrediente) => {
        logInfo(`Encontrado el ingrediente '${ingrediente.insumo.denominacion}' del plato '${ingrediente.plato.denominacion}'`)
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.db -> getIngredienteById -> " + err);
        reject(err);
      });
  });
}; //exports.getIngredienteById

//Actualizar uno
exports.updateIngrediente = (id, ingredienteData) => {
  return new Promise((resolve, reject) => {
    Ingrediente.findByIdAndUpdate(id, ingredienteData, { new: true })
      .then((ingrediente) => {
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.db -> updateIngrediente " + err);
        reject(err);
      });
  });
}; //exports.updateIngrediente

//Borrado lógico de uno
exports.setBorradoIngrediente = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Ingrediente.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((ingrediente) => {
        //Agregar o quitar el ID del ingrediente a los ingredites del plato
        if (borrado) {
          platosDB.removeIngrediente(ingrediente._id, ingrediente.plato);
        } else {
          platosDB.addIngrediente(ingrediente._id, ingrediente.plato);
        }
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.db -> setBorradoIngrediente -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoIngrediente

//Borrado físico de uno
exports.hardDeleteIngrediente = (id) => {
  return new Promise((resolve, reject) => {
    Ingrediente.findByIdAndDelete({ _id: id })
      .then((ingrediente) => {
        platosDB.removeIngrediente(ingrediente._id, ingrediente.plato);
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.db -> hardDeleteIngrediente -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteIngrediente
