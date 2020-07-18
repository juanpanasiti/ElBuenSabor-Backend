const ingredientesDomain = require("../services/ingredientes.services");

exports.createIngrediente = (req, res) => {
  const ingredienteData = req.body;

  ingredientesDomain
    .createIngrediente(ingredienteData)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      console.log("Error -> ingredientes.routes -> createIngrediente " + err);
      res.status(400).json(err);
    });
}; //exports.createIngrediente

exports.getIngredientes = (req, res) => {
  ingredientesDomain
    .getIngredientes()
    .then((ingredientes) => {
      res.json(ingredientes);
    })
    .catch((err) => {
      console.log("Error -> ingredientes.routes -> getIngredientes " + err);
    });
}; //exports.getIngredientes

exports.getIngrediente = (req, res) => {
  ingredientesDomain
    .getIngredienteById(req.params.id)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      console.log("Error -> ingredientes.routes -> getIngrediente " + err);

      res.status(400).json(err);
    });
}; //getIngrediente

exports.updateIngrediente = (req, res) => {
  const ingredienteData = req.body;
  ingredientesDomain
    .updateIngrediente(req.params.id, ingredienteData)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      console.log("Error -> ingredientes.routes -> updateIngrediente " + err);

      res.status(400).json(err);
    });
}; //exports.updateIngrediente

exports.softdeleteIngrediente = (req, res) => {
  ingredientesDomain
    .setBorradoIngrediente(req.params.id, true)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      console.log(
        "Error -> ingredientes.routes -> softdeleteIngrediente -> " + err
      );
      res.json(err);
    });
}; //exports.softdeleteIngrediente

exports.softundeleteIngrediente = (req, res) => {
  ingredientesDomain
    .setBorradoIngrediente(req.params.id, false)
    .then((ingrediente) => {
      res.json(ingrediente);
    })
    .catch((err) => {
      console.log(
        "Error -> ingredientes.routes -> softundeleteIngrediente -> " + err
      );
      res.json(err);
    });
}; //exports.softundeleteIngrediente

exports.hardDeleteIngrediente = (req, res) => {
    ingredientesDomain
      .hardDeleteIngrediente(req.params.id)
      .then((ingrediente) => {
        res.json(ingrediente);
      })
      .catch((err) => {
        console.log("Error -> ingredientes.routes -> hardDeleteIngrediente -> " + err);
        res.json(err);
      });
  }; //exports.hardDeleteIngrediente