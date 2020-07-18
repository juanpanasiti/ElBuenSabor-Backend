const mongoose = require("mongoose");
require("../models/ArticuloReventa");

//Registrar Schema
const Reventa = mongoose.model("ArticuloReventa");

exports.Reventa = Reventa;

//Crear
exports.saveReventa = (reventaData) => {
  return new Promise((resolve, reject) => {
    const reventa = new Reventa(reventaData);
    reventa
      .save()
      .then((reventa) => {
        console.log("Guardado artículo de reventa ID: " + reventa._id);
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.db -> saveReventa -> " + err);
        reject(err);
      });
  });
}; //exports.saveReventa

//Obtener no borrados
exports.getReventas = () => {
  return new Promise((resolve, reject) => {
    Reventa.find({ borrado: false })
      .populate("rubro")
      .then((reventas) => {
        console.log(`Encontrados ${reventas.length} reventas`);
        resolve(reventas);
      })
      .catch((err) => {
        console.log("Error -> reventas.db -> getReventas -> " + err);
        reject(err);
      });
  });
}; //exports.getReventas

//Obtener uno
exports.getReventaById = (reventaId) => {
  return new Promise((resolve, reject) => {
    Reventa.findById(reventaId)
      .populate("rubro")
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.db -> getReventaById -> " + err);
        reject(err);
      });
  });
}; //exports.getReventaById

//Actualizar uno
exports.updateReventa = (id, reventaData) => {
  return new Promise((resolve, reject) => {
    Reventa.findByIdAndUpdate(id, reventaData, { new: true })
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.db -> updateReventa " + err);
        reject(err);
      });
  });
}; //exports.updateReventa

//Borrado lógico de uno
exports.setBorradoReventa = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Reventa.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.db -> setBorradoReventa -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoReventa

//Borrado físico de uno
exports.hardDeleteReventa = (id) => {
  return new Promise((resolve, reject) => {
    Reventa.findByIdAndDelete({ _id: id })
      .then((reventa) => {
        resolve(reventa);
      })
      .catch((err) => {
        console.log("Error -> reventas.db -> hardDeleteReventa -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteReventa
