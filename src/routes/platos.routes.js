const platosService = require("../services/platos.services");
const { logError, logWarning } = require("../config/logger.config");
exports.createPlato = (req, res) => {
    const platoData = req.body;
  
    platosService
      .createPlato(platoData)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        logError("Error -> platos.routes -> createPlato " + err);
        res.status(400).json(err);
      });
  }; //exports.createPlato

  
  exports.getPlatos = (req, res) => {
    platosService
    .getPlatos()
    .then((platos) => {
      res.json(platos);
    })
    .catch((err) => {
      logError("Error -> platos.routes -> getPlatos " + err);
    });
  }; //exports.getPlatos
  
  exports.getPlato = (req, res) => {
    platosService
    .getPlatoById(req.params.id)
    .then((plato) => {
      res.json(plato);
    })
    .catch((err) => {
      logError("Error -> platos.routes -> getPlato " + err);
      
      res.status(400).json(err);
    });
  }; //getPlato
  
  exports.updatePlato = (req, res) => {
    const platoData = req.body;
    platosService
    .updatePlato(req.params.id, platoData)
    .then((plato) => {
      res.json(plato);
    })
    .catch((err) => {
      logError("Error -> platos.routes -> updatePlato " + err);
      
      res.status(400).json(err);
    });
  }; //exports.updatePlato
  
  //Agregar ingredientes al plato existente
  exports.addIngredientes = (req,res) => {
    const platoId = req.params.id
    const ingredientes = req.body
    
    platosService.addIngredientes(platoId,ingredientes)
    .then((plato) => {
      res.json(plato)
    })
    .catch((err) => {
      logError("Error -> platos.routes -> addIngredientes -> " + err);
        res.status(400).json(err);
    })
  }//addIngredientes

  exports.softdeletePlato = (req, res) => {
    platosService
      .setBorradoPlato(req.params.id, true)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        logError("Error -> platos.routes -> softdeletePlato -> " + err);
        res.json(err);
      });
  }; //exports.softdeletePlato
  
  exports.softundeletePlato = (req, res) => {
    platosService
      .setBorradoPlato(req.params.id, false)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        logError("Error -> platos.routes -> softundeletePlato -> " + err);
        res.json(err);
      });
  }; //exports.softundeletePlato
  
  exports.hardDeletePlato = (req, res) => {
    platosService
      .hardDeletePlato(req.params.id)
      .then((plato) => {
        res.json(plato);
      })
      .catch((err) => {
        logError("Error -> platos.routes -> hardDeletePlato -> " + err);
        res.json(err);
      });
  }; //exports.hardDeletePlato
  