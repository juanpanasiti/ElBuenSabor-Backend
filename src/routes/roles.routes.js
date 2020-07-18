const rolesDomain = require("../services/roles.services");
const { logError } = require("../config/logger.config");

exports.createRol = (req, res) => {
  const rolData = req.body;
  rolesDomain
    .createRol(rolData)
    .then((rol) => {
      res.json(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.routes -> createRol ->" + err);
      res.status(400).json(err);
    });
}; //exports.createRol

exports.getOptionsForRoles = (req,res) => {
  rolesDomain.getOptionsForRoles().then((options) => {
    res.json(options)
  })
  .catch((err) => {
    logError(`Error -> roles.routes -> getOptionsForRoles -> ${err}`)
    res.status(400).json(err)
  })
}
exports.getRoles = (req, res) => {
  rolesDomain
    .getRoles()
    .then((roles) => {
      res.json(roles);
    })
    .catch((err) => {
      console.log("Error -> roles.routes -> getRoles ->" + err);
      res.status(400).json(err);
    });
}; //exports.getRoles

exports.getRolById = (req, res) => {
  rolesDomain
    .getRolById(req.params.id)
    .then((rol) => {
      res.json(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.routes -> getRolById ->" + err);
    });
}; //exports.getRolById

exports.updateRol = (req, res) => {
  const rolData = req.body;
  rolesDomain
    .updateRol(req.params.id, rolData)
    .then((rol) => {
      res.json(rol);
    })
    .catch((err) => {
      console.log("Error -> rol.routes -> updateRol " + err);

      res.status(400).json(err);
    });
}; //exports.updateRol

exports.softdeleteRol = (req, res) => {
  rolesDomain
    .setBorradoRol(req.params.id, true)
    .then((rol) => {
      res.json(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.routes -> softdeleteRol -> " + err);
      res.json(err);
    });
}; //exports.softdeleteRol

exports.softundeleteRol = (req, res) => {
  rolesDomain
    .setBorradoRol(req.params.id, false)
    .then((rol) => {
      res.json(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.routes -> softundeleteRol -> " + err);
      res.json(err);
    });
}; //exports.softundeleteRol

exports.hardDeleteRol = (req, res) => {
  rolesDomain
    .hardDeleteRol(req.params.id)
    .then((rol) => {
      res.json(rol);
    })
    .catch((err) => {
      console.log("Error -> roles.routes -> hardDeleteRol -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteRol
