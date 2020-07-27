const ingredientesDB = require("../data/db/ingredientes.db");
const { logError } = require("../config/logger.config");

exports.createIngrediente = (ingredienteData) => {
  return new Promise((resolve, reject) => {
    ingredientesDB
      .saveIngrediente(ingredienteData)
      .then((ingrediente) => {
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.services -> createIngrediente -> " + err);
        reject(err);
      });
  });
}; //exports.createIngrediente

exports.getIngredientes = () => {
  return new Promise((resolve, reject) => {
    ingredientesDB
      .getIngredientes()
      .then((ingredientes) => {
        resolve(ingredientes);
      })
      .catch((err) => {
        logError("Error -> ingredientes.services -> getIngredientes -> " + err);
        reject(err);
      });
  });
}; //exports.getIngredientes

exports.getIngredienteById = (id) => {
  return new Promise((resolve, reject) => {
    ingredientesDB
      .getIngredienteById(id)
      .then((ingrediente) => {
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.services -> getIngredienteById ->" + err);
        reject(err);
      });
  });
}; //exports.getIngredienteById

exports.updateIngrediente = (id, ingredienteData) => {
  return new Promise((resolve, reject) => {
    ingredientesDB
      .updateIngrediente(id, ingredienteData)
      .then((ingrediente) => {
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.services -> updateIngrediente " + err);
        reject(err);
      });
  });
}; //exports.updateIngrediente

exports.setBorradoIngrediente = (id, borrado) => {
  return new Promise((resolve, reject) => {
    ingredientesDB
      .setBorradoIngrediente(id, borrado)
      .then((ingrediente) => {
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.services -> setBorradoIngrediente -> " + err);
        reject(err);
      });
  });
}; //exports.setBorradoIngrediente

exports.hardDeleteIngrediente = (id) => {
  return new Promise((resolve, reject) => {
    ingredientesDB
      .hardDeleteIngrediente(id)
      .then((ingrediente) => {
        resolve(ingrediente);
      })
      .catch((err) => {
        logError("Error -> ingredientes.services -> hardDeleteIngrediente -> " + err);
        reject(err);
      });
  });
}; //exports.hardDeleteIngrediente
