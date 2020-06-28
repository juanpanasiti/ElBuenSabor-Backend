const mongoose = require("mongoose");
const utils = require("../tools/utils.tools");
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
      .populate("roles")
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

//Obtener usuario por ID
exports.getUsuario = (id) => {
  return new Promise((resolve, reject) => {
    Usuario.findById(id)
      .populate("roles")
      .then((usuario) => {
        console.log("encontrado: " + usuario.email);
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> getUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuario

//Obtener usuario por email
exports.getUsuarioByEmail = (email) => {
  return new Promise((resolve, reject) => {
    Usuario.findOne({ email: email })
      .populate("roles")
      .then((usuario) => {
        //console.log("encontrado: " + usuario);
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> getUsuarioByEmail -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuarioByEmail

//Actualizar un usuario
exports.updateUsuario = (id, usuarioData) => {
  return new Promise((resolve, reject) => {
    Usuario.findByIdAndUpdate(id, usuarioData, { new: true })
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> updateUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.updateUsuario

exports.setBorradoUsuario = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Usuario.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> setBorradoUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoUsuario

exports.hardDeleteUsuario = (id) => {
  return new Promise((resolve, reject) => {
    Usuario.findByIdAndDelete({ _id: id })
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.db -> hardDeleteUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteUsuario

//Métodos para implementar relaciones con Roles
//Agregar ID de rol a la lista de roles del usuario
exports.addRol = (rolId, usuarioId) => {
  return new Promise((resolve, reject) => {
    this.getUsuario(usuarioId)
      .then((usuario) => {
        usuario.roles.push(rolId);
        this.updateUsuario(usuarioId, usuario)
          .then((usuarioEd) => {
            resolve(usuarioEd);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}; //exports.addRol

//Remover ID de rol de la lista de roles del usuario
exports.removeRol = (rolId, usuarioId) => {
  return new Promise((resolve, reject) => {
    this.getUsuario(usuarioId)
      .then((usuario) => {
        const roles = utils.removeItemFromList(
          usuario.roles,
          rolId
        );        
        usuario.roles = roles;
        this.updateUsuario(usuarioId, usuario)
          .then((usuarioEd) => {
            resolve(usuarioEd);
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
