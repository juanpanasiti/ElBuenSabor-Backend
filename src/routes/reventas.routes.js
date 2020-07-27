const reventasService = require("../services/reventas.services");
const { logError } = require("../config/logger.config");

exports.createReventa = (req, res) => {
  const reventaData = req.body;

  reventasService
    .createReventa(reventaData)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> createReventa " + err);
      res.status(400).json(err);
    });
}; //exports.createReventa

exports.getReventas = (req, res) => {
  reventasService
    .getReventas()
    .then((reventas) => {
      res.json(reventas);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> getReventas " + err);
    });
}; //exports.getReventas

exports.getReventasParaComprar = (req,res) => {
  reventasService.getReventasParaComprar()
  .then((reventas) => {
    res.json(reventas)
  })
  .catch((error) => {
    logError("Error -> reventas.routes -> getReventas " + error);
    res.status(404).json(error);
  })
}//getReventasParaComprar

exports.getReventa = (req, res) => {
  reventasService
    .getReventaById(req.params.id)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> getReventa " + err);

      res.status(400).json(err);
    });
}; //getReventa

exports.updateReventa = (req, res) => {
  const reventaData = req.body;
  reventasService
    .updateReventa(req.params.id, reventaData)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> updateReventa " + err);

      res.status(400).json(err);
    });
}; //exports.updateReventa

exports.softdeleteReventa = (req, res) => {
  reventasService
    .setBorradoReventa(req.params.id, true)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> softdeleteReventa -> " + err);
      res.json(err);
    });
}; //exports.softdeleteReventa

exports.softundeleteReventa = (req, res) => {
  reventasService
    .setBorradoReventa(req.params.id, false)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> softundeleteReventa -> " + err);
      res.json(err);
    });
}; //exports.softundeleteReventa

exports.hardDeleteReventa = (req, res) => {
  reventasService
    .hardDeleteReventa(req.params.id)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      logError("Error -> reventas.routes -> hardDeleteReventa -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteReventa
