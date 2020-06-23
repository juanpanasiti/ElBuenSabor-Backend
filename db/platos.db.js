const mongoose = require("mongoose");
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
        console.log("plato guardada");
        resolve(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.db -> savePlato -> " + err);
        reject(err);
      });
  });
}; //exports.savePlato

//Obtener no borrados
exports.getPlatos = () => {
  return new Promise((resolve, reject) => {
    Plato.find({ borrado: false })
      .then((platos) => {
        console.log(`Encontrados ${platos.length} platos`);
        resolve(platos);
      })
      .catch((err) => {
        console.log("Error -> platos.db -> getPlatos -> " + err);
        reject(err);
      });
  });
}; //exports.getPlatos

//Obtener uno
exports.getPlatoById = (id) => {
  return new Promise((resolve, reject) => {
    Plato.findById(id)
      .then((plato) => {
        resolve(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.db -> getPlatoById -> " + err);
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
        console.log("Error -> platos.db -> updatePlato " + err);
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
        console.log("Error -> platos.db -> setBorradoPlato -> " + err);
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
        console.log("Error -> platos.db -> hardDeletePlato -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeletePlato
