const domiciliosDomain = require("../domain/domicilios.domain");

exports.createDomicilio = (req, res) => {
  const domicilioData = req.body;

  domiciliosDomain
    .createDomicilio(domicilioData)
    .then((domicilio) => {
      res.json(domicilio);
    })
    .catch((err) => {
      console.log("Error -> domicilios.routes -> createDomicilio " + err);
      res.status(400).json(err);
    });
}; //exports.createDomicilio

exports.getDomicilios = (req, res) => {
  domiciliosDomain
    .getDomicilios()
    .then((domicilios) => {
      res.json(domicilios);
    })
    .catch((err) => {
      console.log("Error -> domicilios.routes -> getDomicilios " + err);
    });
}; //exports.getDomicilios

exports.getDomicilio = (req, res) => {
  domiciliosDomain
    .getDomicilioById(req.params.id)
    .then((domicilio) => {
      res.json(domicilio);
    })
    .catch((err) => {
      console.log("Error -> domicilios.routes -> getDomicilio " + err);

      res.status(400).json(err);
    });
}; //getDomicilio

exports.updateDomicilio = (req, res) => {
  const domicilioData = req.body;
  domiciliosDomain
    .updateDomicilio(req.params.id, domicilioData)
    .then((domicilio) => {
      res.json(domicilio);
    })
    .catch((err) => {
      console.log("Error -> domicilio.routes -> updateDomicilio " + err);

      res.status(400).json(err);
    });
}; //exports.updateDomicilio

exports.softdeleteDomicilio = (req, res) => {
  domiciliosDomain
    .setBorradoDomicilio(req.params.id, true)
    .then((domicilio) => {
      res.json(domicilio);
    })
    .catch((err) => {
      console.log(
        "Error -> domicilios.routes -> softdeleteDomicilio -> " + err
      );
      res.json(err);
    });
}; //exports.softdeleteDomicilio

exports.softundeleteDomicilio = (req, res) => {
  domiciliosDomain
    .setBorradoDomicilio(req.params.id, false)
    .then((domicilio) => {
      res.json(domicilio);
    })
    .catch((err) => {
      console.log(
        "Error -> domicilios.routes -> softundeleteDomicilio -> " + err
      );
      res.json(err);
    });
}; //exports.softundeleteDomicilio

exports.hardDeleteDomicilio = (req, res) => {
  domiciliosDomain
    .hardDeleteDomicilio(req.params.id)
    .then((domicilio) => {
      res.json(domicilio);
    })
    .catch((err) => {
      console.log("Error -> domicilios.routes -> hardDeleteDomicilio -> " + err);
      res.json(err);
    });
}; //exports.hardDeleteDomicilio
