const platosDomain = require("../domain/platos.domain");
exports.createPlato = (req, res) => {
    const platoData = req.body;
  
    platosDomain
      .createPlato(platoData)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> createPlato " + err);
        res.status(400).json(err);
      });
  }; //exports.createPlato
  
  exports.getPlatos = (req, res) => {
    platosDomain
      .getPlatos()
      .then((platos) => {
        res.json(platos);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> getPlatos " + err);
      });
  }; //exports.getPlatos
  
  exports.getPlato = (req, res) => {
    platosDomain
      .getPlatoById(req.params.id)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> getPlato " + err);
  
        res.status(400).json(err);
      });
  }; //getPlato
  
  exports.updatePlato = (req, res) => {
    const platoData = req.body;
    platosDomain
      .updatePlato(req.params.id, platoData)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> updatePlato " + err);
  
        res.status(400).json(err);
      });
  }; //exports.updatePlato
  
  exports.softdeletePlato = (req, res) => {
    platosDomain
      .setBorradoPlato(req.params.id, true)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> softdeletePlato -> " + err);
        res.json(err);
      });
  }; //exports.softdeletePlato
  
  exports.softundeletePlato = (req, res) => {
    platosDomain
      .setBorradoPlato(req.params.id, false)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> softundeletePlato -> " + err);
        res.json(err);
      });
  }; //exports.softundeletePlato
  
  exports.hardDeletePlato = (req, res) => {
    platosDomain
      .hardDeletePlato(req.params.id)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        console.log("Error -> platos.routes -> hardDeletePlato -> " + err);
        res.json(err);
      });
  }; //exports.hardDeletePlato
  