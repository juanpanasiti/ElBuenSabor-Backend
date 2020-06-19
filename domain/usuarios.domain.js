const usuariosDB = require("../db/usuarios.db");

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
};
