const mongoose = require("mongoose");
require("../models/DetalleIngrediente");
const platosDB = require("../db/platos.db");

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
        //Agregar el ID del ingrediente a los ingredites del plato
        platosDB.addIngrediente(ingrediente._id, ingrediente.plato);
        resolve(ingrediente);
      })
      .catch((err) => {
        console.log("Error -> ingredientes.db -> saveIngrediente -> " + err);
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
        console.log(`Encontrados ${ingredientes.length} ingredientes`);
        resolve(ingredientes);
      })
      .catch((err) => {
        console.log("Error -> ingredientes.db -> getIngredientes -> " + err);
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
        resolve(ingrediente);
      })
      .catch((err) => {
        console.log("Error -> ingredientes.db -> getIngredienteById -> " + err);
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
        console.log("Error -> ingredientes.db -> updateIngrediente " + err);
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
        console.log(
          "Error -> ingredientes.db -> setBorradoIngrediente -> " + err
        );
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
        console.log(
          "Error -> ingredientes.db -> hardDeleteIngrediente -> " + err
        );
        reject(err);
      });
  });
}; //exports.hardDeleteIngrediente
