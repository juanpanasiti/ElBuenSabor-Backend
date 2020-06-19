const mongoose = require("mongoose");
require("../models/Usuario");

//Registrar Schema
const Usuario = mongoose.model("Usuario");

exports.Usuario = Usuario;

//Guardar
exports.saveUsuario = (usuarioData) => {
  return new Promise((resolve, reject) => {
    const usuario = new Usuario(usuarioData);
    usuario
      .save()
      .then((usuario) => {
        console.log("Usuario guardado");
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> saveUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.saveUsuario

//Obtener todos los usuarios, incluidos los borrados
exports.getUsuarios = () => {
  return new Promise((resolve, reject) => {
    Usuario.find({})
      .then((usuarios) => {
        console.log(`Encontrados ${usuarios.length} usuarios`);
        resolve(usuarios);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> getUsuarios -> " + err);
        reject(err);
      });
  });
}; //exports.getRoles

exports.getUsuarioByEmail = (email) => {
    console.log("Buscando usuario " + email);
    
  return new Promise((resolve, reject) => {
    Usuario.findOne({ email: email })
      .then((usuario) => {
        console.log("encontrado: " + usuario);
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> getUserByEmail -> " + err);
        reject(err);
      });
  });
};//exports.getUserByEmail
