const platosDB = require("../data/db/platos.db");
const ingredienteService = require("./ingredientes.services");
const { newDetalleIngredienteDTO } = require("../data/dto/detalleIngrediente.dto");
const { logError, logWarning, logInfo } = require("../config/logger.config");

exports.createPlato = (platoData) => {
  return new Promise((resolve, reject) => {
    platosDB
      .savePlato(platoData)
      .then((plato) => {
        resolve(plato);
      })
      .catch((error) => {
        logError("Error -> platos.services -> createPlato -> " + error);
        reject(error);
      });
  });
}; //exports.createPlato

exports.getPlatos = () => {
  return new Promise((resolve, reject) => {
    platosDB
      .getPlatos()
      .then((platos) => {
        const platosValidos = [];
        for (const plato of platos) {
          let valido = true;
          if (plato.ingredientes.length) {
            //Solo mostrar platos con ingredientes
            //sino significa que el plato no está completamente cargado
            for (const ingrediente of plato.ingredientes) {
              if (ingrediente.insumo.stockActual < ingrediente.cantidad) {
                valido = false;
                break;
              }
            } //for-ingredientes
          } //if
          if (valido) {
            platosValidos.push(plato);
          }
        } //for-platos
        logWarning(platosValidos.length);
        resolve(platosValidos);
      })
      .catch((error) => {
        logError("Error -> platos.services -> getPlatos -> " + error);
        reject(error);
      });
  });
}; //exports.getPlatos

exports.getPlatosPorRubro = (rubroId) => {
  return new Promise((resolve, reject) => {
    platosDB
      .getPlatosPorRubro(rubroId)
      .then((platos) => {
        const platosValidos = [];
        for (const plato of platos) {
          let valido = true;
          if (plato.ingredientes.length) {
            //Solo mostrar platos con ingredientes
            //sino significa que el plato no está completamente cargado
            for (const ingrediente of plato.ingredientes) {
              if (ingrediente.insumo.stockActual < ingrediente.cantidad) {
                valido = false;
                break;
              }
            } //for-ingredientes
          } //if
          if (valido) {
            platosValidos.push(plato);
          }
        } //for-platos
        logWarning(platosValidos.length);
        resolve(platosValidos);
      })
      .catch((error) => {
        logError("Error -> platos.services -> getPlatosPorRubro -> " + error);
        reject(error);
      });
  });
}; //exports.getPlatosPorRubro

exports.getPlatoById = (platoId) => {
  return new Promise((resolve, reject) => {
    platosDB
      .getPlatoById(platoId)
      .then((plato) => {
        resolve(plato);
      })
      .catch((error) => {
        logError("Error -> platos.services -> getPlatoById ->" + error);
        reject(error);
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
      .catch((error) => {
        logError("Error -> platos.services -> updatePlato " + error);
        reject(error);
      });
  });
}; //exports.updatePlato

exports.addIngredientes = async (platoId, ingredientesData) => {
  for (const ingrediente of ingredientesData) {
    ingredienteDTO = newDetalleIngredienteDTO(
      platoId,
      ingrediente.insumo_id,
      ingrediente.cantidad
    );
    logInfo(ingredienteDTO);
    await addIngrediente(ingredienteDTO);
  }
  return new Promise((resolve, reject) => {
    platosDB
      .getPlatoById(platoId)
      .then((plato) => {
        resolve(plato);
      })
      .catch((error) => {
        logError("Error -> platos.services -> addIngredientes ->" + error);
        reject(error);
      });
  });
}; //exports.addIngredientes

exports.setBorradoPlato = (id, borrado) => {
  return new Promise((resolve, reject) => {
    platosDB
      .setBorradoPlato(id, borrado)
      .then((plato) => {
        resolve(plato);
      })
      .catch((error) => {
        logError("Error -> platos.services -> setBorradoPlato -> " + error);
        reject(error);
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
      .catch((error) => {
        logError("Error -> platos.services -> hardDeletePlato -> " + error);
        reject(error);
      });
  });
}; //exports.hardDeletePlato

/////////////////////////////////////////
async function addIngrediente(ingredienteData) {
  const ingrediente = await ingredienteService.createIngrediente(ingredienteData);
  await platosDB.addIngrediente(ingrediente._id, ingredienteData.plato);
}
