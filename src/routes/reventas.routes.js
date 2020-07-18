const reventasDomain = require("../services/reventas.services");

exports.createReventa = (req, res) => {
  const reventaData = req.body;

  reventasDomain
    .createReventa(reventaData)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> createReventa " + err);
      res.status(400).json(err);
    });
}; //exports.createReventa

exports.getReventas = (req, res) => {
  reventasDomain
    .getReventas()
    .then((reventas) => {
      res.json(reventas);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> getReventas " + err);
    });
}; //exports.getReventas

exports.getReventa = (req, res) => {
  reventasDomain
    .getReventaById(req.params.id)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> getReventa " + err);

      res.status(400).json(err);
    });
}; //getReventa

exports.updateReventa = (req, res) => {
  const reventaData = req.body;
  reventasDomain
    .updateReventa(req.params.id, reventaData)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> updateReventa " + err);

      res.status(400).json(err);
    });
}; //exports.updateReventa

exports.softdeleteReventa = (req, res) => {
  reventasDomain
    .setBorradoReventa(req.params.id, true)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> softdeleteReventa -> " + err);
      res.json(err);
    });
}; //exports.softdeleteReventa

exports.softundeleteReventa = (req, res) => {
  reventasDomain
    .setBorradoReventa(req.params.id, false)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> softundeleteReventa -> " + err);
      res.json(err);
    });
}; //exports.softundeleteReventa

exports.hardDeleteReventa = (req, res) => {
  reventasDomain
    .hardDeleteReventa(req.params.id)
    .then((reventa) => {
      res.json(reventa);
    })
    .catch((err) => {
      console.log("Error -> reventas.routes -> hardDeleteReventa -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteReventa
