//const db_tools = require("../tools/db_tools");
const mongoose = require("mongoose");
require("../models/Rol");

//Conectar db
//const db = db_tools.getDBConexion();

//Registrar Schema
const Rol = mongoose.model("Rol");

exports.Rol = Rol;
//Crear
exports.saveRol = (rolData) => {
  return new Promise((resolve, reject) => {
    const rol = new Rol(rolData);
    rol
      .save()
      .then((rol) => {
        console.log("Rol guardado");
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.db -> saveRol -> " + err);
        reject(err);
      });
  });
}; //exports.saveRol

//Contar no borrados

//Obtener no borrados
exports.getRoles = () => {
  return new Promise((resolve, reject) => {
    Rol.find({borrado:false})
      .populate("usuario")
      .then((roles) => {
        console.log(`Encontrados ${roles.length} roles`);
        resolve(roles);
      })
      .catch((err) => {
        console.log("Error obteniendo roles en roles.db " + err);
        reject(err);
      });
  });
}; //exports.getRoles

//Obtener borrados
exports.getRolesBorrados = () => {
  return new Promise((resolve, reject) => {
    Rol.find({ borrado: true })
      .populate("usuario")
      .then((roles) => {
        console.log(`Encontrados ${roles.length} roles`);
        resolve(roles);
      })
      .catch((err) => {
        console.log("Error obteniendo roles en roles.db " + err);
        reject(err);
      });
  });
}; //exports.getRolesBorrados

//Obtener por usuario (ID)
exports.getRolesByUsuario = (usuarioId) => {
  return new Promise((resolve, reject) => {
    Rol.find({ usuario: usuarioId })
      .populate("usuario")
      .then((roles) => {
        resolve(roles);
      })
      .catch((err) => {
        console.log("Error -> roles.db -> getRolesByUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.getRolesByUsuario

//Obtener uno
exports.getRolById = (rolId) => {
  return new Promise((resolve, reject) => {
    Rol.findById(rolId)
      .populate("usuario")
      .then((rol) => {
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.db -> getRolesByUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.getRolById

//Actualizar uno
exports.updateRol = (id, rolData) => {
  return new Promise((resolve, reject) => {
    Rol.findByIdAndUpdate(id, rolData, { new: true })
    .then((rol) => {
      console.log("Actualizando rol: " + rol)
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.db -> updateRol " + err);
        reject(err);
      });
  });
}; //exports.updateRol

//Borrado lógico de uno
exports.setBorradoRol = (id, borrado) => {
  return new Promise((resolve, reject) => {
    Rol.findByIdAndUpdate(id, { borrado: borrado }, { new: true })
      .then((rol) => {
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.db -> setBorradoRol -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoRol

//Borrado físico de uno
exports.hardDeleteRol = (id) => {
  return new Promise((resolve, reject) => {
    Rol.findByIdAndDelete({ _id: id })
      .then((rol) => {
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.db -> hardDeleteRol -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteRol
