const rolesDB = require("../db/roles.db");

exports.getRoles = () => {
  return new Promise((resolve, reject) => {
    rolesDB
      .getRoles()
      .then((roles) => {
        resolve(roles);
      })
      .catch((err) => {
        reject(err);
      });
  });
}; //exports.getRoles
