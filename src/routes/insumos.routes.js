const insumosDomain = require("../services/insumos.services");

exports.createInsumo = (req, res) => {
  const insumoData = req.body;

  insumosDomain
    .createInsumo(insumoData)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> createInsumo " + err);
      res.status(400).json(err);
    });
}; //exports.createInsumo

exports.getInsumos = (req, res) => {
  insumosDomain
    .getInsumos()
    .then((insumos) => {
      res.json(insumos);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> getInsumos " + err);
    });
}; //exports.getInsumos

exports.getInsumo = (req, res) => {
  insumosDomain
    .getInsumoById(req.params.id)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> getInsumo " + err);

      res.status(400).json(err);
    });
}; //getInsumo

exports.updateInsumo = (req, res) => {
  const insumoData = req.body;
  insumosDomain
    .updateInsumo(req.params.id, insumoData)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> updateInsumo " + err);

      res.status(400).json(err);
    });
}; //exports.updateInsumo

exports.softdeleteInsumo = (req, res) => {
  insumosDomain
    .setBorradoInsumo(req.params.id, true)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> softdeleteInsumo -> " + err);
      res.json(err);
    });
}; //exports.softdeleteInsumo

exports.softundeleteInsumo = (req, res) => {
  insumosDomain
    .setBorradoInsumo(req.params.id, false)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> softundeleteInsumo -> " + err);
      res.json(err);
    });
}; //exports.softundeleteInsumo

exports.hardDeleteInsumo = (req, res) => {
  insumosDomain
    .hardDeleteInsumo(req.params.id)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      console.log("Error -> insumos.routes -> hardDeleteInsumo -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteInsumo
