const platosDB = require("../db/platos.db");

exports.createPlato = (platoData) => {
    return new Promise((resolve, reject) => {
      platosDB
        .savePlato(platoData)
        .then((plato) => {
          resolve(plato);
        })
        .catch((err) => {
          console.log("Error -> platos.domain -> createPlato -> " + err);
          reject(err);
        });
    });
  }; //exports.createPlato
  
  exports.getPlatos = () => {
    return new Promise((resolve, reject) => {
      platosDB
        .getPlatos()
        .then((platos) => {
          resolve(platos);
        })
        .catch((err) => {
          console.log("Error -> platos.domain -> getPlatos -> " + err);
          reject(err);
        });
    });
  }; //exports.getPlatos
  
  exports.getPlatoById = (platoId) => {
    return new Promise((resolve, reject) => {
      platosDB
        .getPlatoById(platoId)
        .then((plato) => {
          resolve(plato);
        })
        .catch((err) => {
          console.log("Error -> platos.domain -> getPlatoById ->" + err);
          reject(err);
        });
    });
  }; //exports.getPlatoById
  
  exports.updatePlato = (id, platoData) => {
    return new Promise((resolve, reject) => {
      platosDB
        .updatePlato(id, platoData)
        .then((plato) => {
          resolve(plato);
        })
        .catch((err) => {
          console.log("Error -> platos.domain -> updatePlato " + err);
          reject(err);
        });
    });
  }; //exports.updatePlato
  
  exports.setBorradoPlato = (id, borrado) => {
    return new Promise((resolve, reject) => {
      platosDB
        .setBorradoPlato(id, borrado)
        .then((plato) => {
          resolve(plato);
        })
        .catch((err) => {
          console.log("Error -> platos.domain -> setBorradoPlato -> " + err);
          reject(err);
        });
    });
  }; //exports.setBorradoPlato
  
  exports.hardDeletePlato = (id) => {
    return new Promise((resolve, reject) => {
      platosDB
        .hardDeletePlato(id)
        .then((plato) => {
          resolve(plato);
        })
        .catch((err) => {
          console.log("Error -> platos.domain -> hardDeletePlato -> " + err);
          reject(err);
        });
    });
  }; //exports.hardDeletePlato
  