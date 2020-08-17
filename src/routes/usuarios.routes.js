const usuariosService = require("../services/usuarios.services");
const { logSuccess, logError, logInfo, logWarning } = require("../config/logger.config");

exports.getUsuarios = (req, res) => {
  usuariosService
    .getUsuarios()
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getUsuarios -> " + err);
      res.json(err);
    });
}; //exports.getUsuarios

exports.getUsuarioByEmail = (req, res) => {
  const crear = false;
  usuariosService
    .getUsuarioByEmail(req.params.email, crear)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getUsuarioByEmail -> " + err);
      res.status(400).json(err);
    });
}; //exports.getUsuarioByEmail

exports.checkUsuarioByEmail = (req, res) => {
  const crear = true;
  usuariosService
    .getUsuarioByEmail(req.params.email, crear)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> checkUsuarioByEmail -> " + err);
      res.status(400).json(err);
    });
}; //exports.checkUsuarioByEmail

exports.getUsuarioById = (req, res) => {
  usuariosService
    .getUsuarioById(req.params.id)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getUsuarioById -> " + err.message);
      res.status(err.code).json(err);
    });
}; //exports.getUsuarioById

exports.getEmpleados = (req, res) => {
  usuariosService
    .getEmpleados()
    .then((usuarios) => {
      res.json(usuarios);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getEmpleados -> " + err.message);
      res.status(err.code).json(err);
    });
}; //getEmpleados

exports.updateUsuario = (req, res) => {
  const usuarioData = req.body;
  usuariosService
    .updateUsuario(req.params.id, usuarioData)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getUsuarioById -> " + err);
      res.json(err);
    });
}; //exports.updateUsuario

exports.softdeleteUsuario = (req, res) => {
  usuariosService
    .setBorradoUsuario(req.params.id, true)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> softdeleteUsuario -> " + err);
      res.json(err);
    });
}; //exports.softdeleteUsuario

exports.softundeleteUsuario = (req, res) => {
  usuariosService
    .setBorradoUsuario(req.params.id, false)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> softundeleteUsuario -> " + err);
      res.json(err);
    });
}; //exports.softundeleteUsuario

exports.hardDeleteUsuario = (req, res) => {
  usuariosService
    .hardDeleteUsuario(req.params.id)
    .then((usuario) => {
      res.json(usuario);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> hardDeleteUsuario -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteUsuario

exports.getRolesByEmail = (req, res) => {
  usuariosService
    .getRolesByEmail(req.params.email)
    .then((roles) => {
      res.json(roles);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getRolesByEmail -> " + err);
      res.json(err);
    });
}; //getRolesByEmail

exports.getUsuariosByRol = (req, res) => {
  usuariosService
    .getUsuarioByRol(req.params.rol)
    .then((usuarios) => {
      logError(usuarios.length);

      res.json(usuarios);
    })
    .catch((err) => {
      logError("Error -> usuarios.routes -> getUsuariosByRol -> " + err);
      res.json(err);
    });
}; //exports.getUsuariosByRol
