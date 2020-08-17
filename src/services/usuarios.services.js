const usuariosDB = require("../data/db/usuarios.db");
const rolesDB = require("../data/db/roles.db");
const { logError, logWarning, logSuccess } = require("../config/logger.config");

exports.getUsuarios = () => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .getUsuarios()
      .then((usuarios) => {
        resolve(usuarios);
      })
      .catch((err) => {
        logError("Error -> usuarios.services -> getUsuarios -> " + err);
        reject(err);
      });
  });
}; //exports.getUsuarios

exports.getUsuarioByEmail = (email, crear) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .getUsuarioByEmail(email)
      .then((usuario) => {
        logWarning(usuario)
        if (!usuario) {
          if(crear){
            logWarning(
              `El usuario ${email} no se encuentra registrado, por lo que se lo cargará en el sistema.`
            );
            return usuariosDB
              .saveUsuario({ email: email })
              .then((nuevoUsuario) => {
                usuario = nuevoUsuario;
                //return usuario
                resolve(usuario);
              })
              .catch((err) => {
                logError(
                  "Error -> usuarios.services -> getUsuarioByEmail -> save -> " +
                    err
                );
                reject(err);
              });

          }else {
            reject({message: `No se encontró el usuario con el email ${email}`})
          }
        }
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.services -> getUsuarioByEmail -> " + err);
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
        logError("Error -> usuarios.services -> getUsuarioById -> " + err.message);
        reject(err);
      });
  });
}; //exports.getUsuarioById

exports.getEmpleados = () => {
  return new Promise((resolve,reject) => {
    usuariosDB.getEmpleados()
    .then((usuarios) => {
      resolve(usuarios);
    })
    .catch((err) => {
      logError("Error -> usuarios.services -> getEmpleados -> " + err.message);
      reject(err);
    });
  })
}//getEmpleados

exports.updateUsuario = (id, usuarioData) => {
  return new Promise((resolve, reject) => {
    usuariosDB
      .updateUsuario(id, usuarioData)
      .then((usuario) => {
        resolve(usuario);
      })
      .catch((err) => {
        logError("Error -> usuarios.services -> updateUsuario -> " + err);
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
        logError("Error -> usuarios.services -> setBorradoUsuario -> " + err);
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
        logError("Error -> usuarios.services -> hardDeleteUsuario -> " + err);
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
            logSuccess(`Encontrados ${roles.length} roles.`);
            resolve(roles);
          })
          .catch((err) => {
            logError(
              "Error -> usuarios.services -> getRolesByEmail -> getRolesByUsuario ->" +
                err
            );
            reject(err);
          });
      })
      .catch((error) => {
        logError("Error -> usuarios.services -> getRolesByEmail -> " + err);
        reject(err);
      });
  });
}; //exports.getRolesByEmail

exports.getUsuarioByRol = (nombreRol) => {
  return new Promise((resolve, reject) => {
    rolesDB
      .getRolesByNombre(nombreRol)
      .then((roles) => {
        const promises = [];
        for (let rol of roles) {
          promises.push(usuariosDB.getUsuario(rol.usuario));
        } //for()
        return Promise.all(promises);
      }) //then
      .then((usuariosRes) => {
        resolve(usuariosRes);
      })
      .catch((error) => {
        logError("Error -> usuarios.services -> getUsuarioByRol -> " + err);
        reject(error);
      });
  }); //Promise
}; //exports.getUsuarioByRol
