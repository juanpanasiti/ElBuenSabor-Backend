const rolesDB = require("../db/roles.db");

exports.createRol = (rolData) => {
  return new Promise((resolve, reject) => {
    rolesDB
      .saveRol(rolData)
      .then((roles) => {
        resolve(roles);
      })
      .catch((err) => {
        console.log("Error -> roles.domain -> createRol ->" + err);
        reject(err);
      });
  });
}; //exports.createRol
exports.getRoles = () => {
  return new Promise((resolve, reject) => {
    rolesDB
      .getRoles()
      .then((roles) => {
        resolve(roles);
      })
      .catch((err) => {
        console.log("Error -> roles.domain -> getRoles ->" + err);
        reject(err);
      });
  });
}; //exports.getRoles

exports.getRolById = (rolId) => {
  return new Promise((resolve, reject) => {
    rolesDB.getRolById(rolId)
    .then((rol) => {
      resolve(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.domain -> getRolById ->" + err);
      reject(err);
    });
  })
}//exports.getRolById

exports.updateRol = (id, rolData) => {
  return new Promise((resolve, reject) => {
    rolesDB
      .updateRubro(id, rolData)
      .then((rol) => {
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.domain -> updateRol " + err);
        reject(err);
      });
  });
}; //exports.updateRol

exports.setBorradoRol = (id, borrado) => {
  return new Promise((resolve, reject) => {
    rolesDB
      .setBorradoRol(id, borrado)
      .then((rol) => {
        resolve(rol);
      })
      .catch((err) => {
        console.log("Error -> roles.domain -> setBorradoRol -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoRol

exports.hardDeleteRol = (id) => {
  return new Promise((resolve, reject) => {
  usuariosDB
    .hardDeleteRol(id)
    .then((rol) => {
      resolve(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.domain -> hardDeleteRol -> " + err);
      reject(err);
    });
  })
}; //exports.hardDeleteRol