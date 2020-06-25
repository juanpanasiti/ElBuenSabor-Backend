const usuariosDB = require("../db/usuarios.db");
const rolesDB = require("../db/roles.db");

exports.getUsuarios = () => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .getUsuarios()
      .then((usuarios) => {
        resolve(usuarios);
      })
      .catch((err) => {
        console.log("Error -> usuarios.domain -> getUsuarios -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuarios

exports.getUsuarioByEmail = (email) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .getUsuarioByEmail(email)
      .then((usuario) => {
        if (!usuario) {
          return usuariosDB
            .saveUsuario({ email: email })
            .then((nuevoUsuario) => {
              usuario = nuevoUsuario;
              //return usuario
              resolve(usuario);
            })
            .catch((err) => {
              console.log(
                "Error -> usuarios.domain -> getUsuarioByEmail -> save -> " +
                  err
              );
              reject(err);
            });
        }
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.domain -> getUsuarioByEmail -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuarioByEmail

exports.getUsuarioById = (id) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .getUsuario(id)
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.domain -> getUsuarioById -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuarioById

exports.updateUsuario = (id, usuarioData) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .updateUsuario(id, usuarioData)
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.domain -> updateUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.updateUsuario

exports.setBorradoUsuario = (id, borrado) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .setBorradoUsuario(id, borrado)
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.domain -> setBorradoUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoUsuario

exports.hardDeleteUsuario = (id) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .hardDeleteUsuario(id)
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        console.log("Error -> usuarios.domain -> hardDeleteUsuario -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteUsuario

//Integración con roles
exports.getRolesByEmail = (email) => {
  return new Promise((resolve, reject) => {
    this.getUsuarioByEmail(email)
      .then((usuario) => {
        //return usuario

        rolesDB
          .getRolesByUsuario(usuario._id)
          .then((roles) => {
            console.log("Encontrado: " + roles);
            resolve(roles);
          })
          .catch((err) => {
            console.log(
              "Error -> usuarios.domain -> getRolesByEmail -> getRolesByUsuario ->" +
                err
            );
            reject(err);
          });
      })
      .catch((error) => {
        console.log("Error -> usuarios.domain -> getRolesByEmail -> " + err);
        reject(err);
      });
  });
}; //exports.getRolesByEmail

exports.addRol = (idRol, idUsuario) => {
  return new Promise((resolve, reject) => {
    this.getUsuarioById(idUsuario)
      .then((usuario) => {
        usuario.roles.push(idRol);
        console.log(usuario);
        this.updateUsuario(idUsuario, usuario)
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
};//exports.addRol
