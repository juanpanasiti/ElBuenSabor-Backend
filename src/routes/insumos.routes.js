const insumosService = require("../services/insumos.services");
const { logError } = require("../config/logger.config");

exports.createInsumo = (req, res) => {
  const insumoData = req.body;

  insumosService
    .createInsumo(insumoData)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> createInsumo " + err);
      res.status(400).json(err);
    });
}; //exports.createInsumo

exports.getInsumos = (req, res) => {
  insumosService
    .getInsumos()
    .then((insumos) => {
      res.json(insumos);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> getInsumos " + err);
      res.status(404).json(err);
    });
}; //exports.getInsumos

exports.getInsumosParaComprar = (req,res) => {
  insumosService.getInsumosParaComprar()
  .then((insumos) => {
    res.json(insumos)
  })
  .catch((error) => {
    logError("Error -> insumos.routes -> getInsumos " + error);
    res.status(404).json(error);
  })
}//getInsumosParaComprar

exports.getInsumo = (req, res) => {
  insumosService
    .getInsumoById(req.params.id)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> getInsumo " + err);

      res.status(400).json(err);
    });
}; //getInsumo

exports.updateInsumo = (req, res) => {
  const insumoData = req.body;
  insumosService
    .updateInsumo(req.params.id, insumoData)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> updateInsumo " + err);

      res.status(400).json(err);
    });
}; //exports.updateInsumo

exports.softdeleteInsumo = (req, res) => {
  insumosService
    .setBorradoInsumo(req.params.id, true)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> softdeleteInsumo -> " + err);
      res.json(err);
    });
}; //exports.softdeleteInsumo

exports.softundeleteInsumo = (req, res) => {
  insumosService
    .setBorradoInsumo(req.params.id, false)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> softundeleteInsumo -> " + err);
      res.json(err);
    });
}; //exports.softundeleteInsumo

exports.hardDeleteInsumo = (req, res) => {
  insumosService
    .hardDeleteInsumo(req.params.id)
    .then((insumo) => {
      res.json(insumo);
    })
    .catch((err) => {
      logError("Error -> insumos.routes -> hardDeleteInsumo -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteInsumo
