const mongoose = require("mongoose");
const utils = require("../../tools/utils.tools");
const {logSuccess,logInfo, logError, logWarning} = require('../../config/logger.config')
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
        logSuccess("Usuario creado");
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> saveUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.saveUsuario

//Obtener todos los usuarios, incluidos los borrados
exports.getUsuarios = () => {
  return new Promise((resolve, reject) => {
    logInfo('Listando todos los usuarios')
    Usuario.find({})
      .populate("roles")
      .populate("domicilios")
      .then((usuarios) => {
        logSuccess(`Encontrados ${usuarios.length} usuarios`);
        resolve(usuarios);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> getUsuarios -> " + err);
        reject(err);
      });
  });
}; //exports.getRoles

//Obtener usuario por ID
exports.getUsuario = (id) => {
  return new Promise((resolve, reject) => {
    logInfo(`Buscando al usuario con ID ${id}`)
    Usuario.findById(id)
      .populate("roles")
      .populate("domicilios")
      .then((usuario) => {
        if (usuario) {
          logSuccess(`Encontrado usuario con email ${usuario.email}`);
        } else {
          const error = {
            message: "No se encontró ningún usuario con el ID " + id,
            code: 404
          }
          reject(error)
        }
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> getUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuario

//Obtener usuario por email
exports.getUsuarioByEmail = (email) => {
  logInfo(`Buscando al usuario con email ${email}`)
  return new Promise((resolve, reject) => {
    Usuario.findOne({ email: email })
      .populate("roles")
      .populate("domicilios")
      .then((usuario) => {
        if(usuario){
          logSuccess("Encontrado usuario " + usuario.email);
        }else {
          logWarning(`No se encontró el usuario ${email}, se lo registrará como nuevo usuario.`)
        }
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> getUsuarioByEmail -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuarioByEmail

//Actualizar un usuario
exports.updateUsuario = (id, usuarioData) => {
  logInfo(`Actualizando datos del usuario ${id}`)
  return new Promise((resolve, reject) => {
    Usuario.findByIdAndUpdate(id, usuarioData, { new: true })
      .then((usuario) => {
        logSuccess(`Actualizados los datos del usuario ${usuario}`)
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> updateUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.updateUsuario

exports.setBorradoUsuario = (id, borrado) => {
  logInfo(`Settear el estado de borrado del usuario ${id} en ${borrado}`)
  return new Promise((resolve, reject) => {
    Usuario.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((usuario) => {
        logSuccess(`Estado de borrado setteado exitosamente a ${borrado}`)
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> setBorradoUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoUsuario

exports.hardDeleteUsuario = (id) => {
  return new Promise((resolve, reject) => {
    logWarning(`Se borrará permanentemente el usuario con ID ${id}`)
    Usuario.findByIdAndDelete({ _id: id })
      .then((usuario) => {
        logSuccess(`Se eliminó exitosamente el usuario ${usuario}`)
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.db -> hardDeleteUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteUsuario

//Métodos para implementar relaciones con Roles y Domicilios
//Agregar ID de rol a la lista de roles del usuario
exports.addRol = (rolId, usuarioId) => {
  logInfo(`Agregar nuevo rol al usuario ${usuarioId}`)
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
        const roles = utils.removeItemFromList(usuario.roles, rolId);
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
}; //exports.removeRol

//Agregar ID de domicilio a la lista de domicilios del usuario
exports.addDomicilio = (domicilioId, usuarioId) => {
  return new Promise((resolve, reject) => {
    this.getUsuario(usuarioId)
      .then((usuario) => {
        usuario.domicilios.push(domicilioId);
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
}; //exports.addDomicilio

//Remover ID de domicilio de la lista de domicilios del usuario
exports.removeDomicilio = (domicilioId, usuarioId) => {
  return new Promise((resolve, reject) => {
    this.getUsuario(usuarioId)
      .then((usuario) => {
        const domicilios = utils.removeItemFromList(
          usuario.domicilios,
          domicilioId
        );
        usuario.domicilios = domicilios;
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
}; //exports.removeDomicilio
