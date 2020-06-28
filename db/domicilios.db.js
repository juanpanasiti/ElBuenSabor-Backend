const mongoose = require("mongoose");
require("../models/Domicilio");
const usuariosDB = require("../db/usuarios.db");

//Registrar Schema
const Domicilio = mongoose.model("Domicilio");

exports.Domicilio = Domicilio;

//Crear
exports.saveDomicilio = (domicilioData) => {
  return new Promise((resolve, reject) => {
    const domicilio = new Domicilio(domicilioData);
    domicilio
      .save()
      .then((domicilio) => {
        usuariosDB.addDomicilio(domicilio._id, domicilio.usuario);
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.db -> saveDomicilio -> " + err);
        reject(err);
      });
  });
}; //exports.saveDomicilio

//Obtener no borrados
exports.getDomicilios = () => {
  return new Promise((resolve, reject) => {
    Domicilio.find({ borrado: false })
      .populate("usuario")
      .then((domicilios) => {
        console.log(`Encontrados ${domicilios.length} domicilios`);
        resolve(domicilios);
      })
      .catch((err) => {
        console.log("Error -> domicilios.db -> getDomicilios -> " + err);
        reject(err);
      });
  });
}; //exports.getDomicilios

//Obtener uno
exports.getDomicilioById = (id) => {
  return new Promise((resolve, reject) => {
    Domicilio.findById(id)
      .populate("usuario")
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.db -> getDomicilioById -> " + err);
        reject(err);
      });
  });
}; //exports.getDomicilioById

//Actualizar uno
exports.updateDomicilio = (id, domicilioData) => {
  return new Promise((resolve, reject) => {
    Domicilio.findByIdAndUpdate(id, domicilioData, { new: true })
      .then((domicilio) => {
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.db -> updateDomicilio " + err);
        reject(err);
      });
  });
}; //exports.updateDomicilio

//Borrado lógico de uno
exports.setBorradoDomicilio = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Domicilio.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((domicilio) => {
        //Agregar o quitar el ID del rol a los roles del usuario
        if (borrado) {
          usuariosDB.removeDomicilio(domicilio._id, domicilio.usuario);
        } else {
          usuariosDB.addDomicilio(domicilio._id, domicilio.usuario);
        }
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.db -> setBorradoDomicilio -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoDomicilio

//Borrado físico de uno
exports.hardDeleteDomicilio = (id) => {
  return new Promise((resolve, reject) => {
    Domicilio.findByIdAndDelete({ _id: id })
      .then((domicilio) => {
        usuariosDB.removeDomicilio(domicilio._id, domicilio.usuario);
        resolve(domicilio);
      })
      .catch((err) => {
        console.log("Error -> domicilios.db -> hardDeleteDomicilio -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteDomicilio
