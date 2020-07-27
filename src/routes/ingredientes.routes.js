const ingredientesService = require("../services/ingredientes.services");
const { logError } = require("../config/logger.config");

exports.createIngrediente = (req, res) => {
  const ingredienteData = req.body;

  ingredientesService
    .createIngrediente(ingredienteData)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      logError("Error -> ingredientes.routes -> createIngrediente " + err);
      res.status(400).json(err);
    });
}; //exports.createIngrediente

exports.getIngredientes = (req, res) => {
  ingredientesService
    .getIngredientes()
    .then((ingredientes) => {
      res.json(ingredientes);
    })
    .catch((err) => {
      logError("Error -> ingredientes.routes -> getIngredientes " + err);
    });
}; //exports.getIngredientes

exports.getIngrediente = (req, res) => {
  ingredientesService
    .getIngredienteById(req.params.id)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      logError("Error -> ingredientes.routes -> getIngrediente " + err);

      res.status(400).json(err);
    });
}; //getIngrediente

exports.updateIngrediente = (req, res) => {
  const ingredienteData = req.body;
  ingredientesService
    .updateIngrediente(req.params.id, ingredienteData)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      logError("Error -> ingredientes.routes -> updateIngrediente " + err);

      res.status(400).json(err);
    });
}; //exports.updateIngrediente

exports.softdeleteIngrediente = (req, res) => {
  ingredientesService
    .setBorradoIngrediente(req.params.id, true)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      logError(
        "Error -> ingredientes.routes -> softdeleteIngrediente -> " + err
      );
      res.json(err);
    });
}; //exports.softdeleteIngrediente

exports.softundeleteIngrediente = (req, res) => {
  ingredientesService
    .setBorradoIngrediente(req.params.id, false)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      logError(
        "Error -> ingredientes.routes -> softundeleteIngrediente -> " + err
      );
      res.json(err);
    });
}; //exports.softundeleteIngrediente

exports.hardDeleteIngrediente = (req, res) => {
    ingredientesService
      .hardDeleteIngrediente(req.params.id)
      .then((ingrediente) => {
        res.json(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.routes -> hardDeleteIngrediente -> " + err);
        res.json(err);
      });
  }; //exports.hardDeleteIngrediente