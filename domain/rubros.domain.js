const rubrosDB = require("../db/rubros.db");

exports.createRubro = (rubroData) => {
    return new Promise((resolve, reject) => {
        rubrosDB
            .saveRubro(rubroData)
            .then((rubro) => {
                resolve(rubro);
            })
            .catch((err) => {
                reject(err);
            });
    });
}; //exports.createRubro

exports.getRubros = (borrado) => {
    return new Promise((resolve, reject) => {
        rubrosDB
            .getRubros(borrado)
            .then((rubros) => {
                resolve(rubros);
            })
            .catch((err) => {
                reject(err);
            });
    });
}; //exports.getRubros

exports.getRubrosPorTipo = (esDeInsumo) => {
    return new Promise((resolve, reject) => {
        rubrosDB
            .getRubrosPorTipo(esDeInsumo)
            .then((rubros) => {
                resolve(rubros);
            })
            .catch((err) => {
                reject(err);
            });
    });
}; //exports.getRubros

exports.getRubro = (id) => {
    return new Promise((resolve, reject) => {
        rubrosDB
            .getRubro(id)
            .then((rubro) => {
                resolve(rubro);
            })
            .catch((err) => {
                reject(err);
            });
    });
}; //exports.getRubro

exports.updateRubro = (id, rubroData) => {
    return new Promise((resolve, reject) => {
        rubrosDB
            .updateRubro(id, rubroData)
            .then((rubro) => {
                resolve(rubro);
            })
            .catch((err) => {
                reject(err);
            });
    });
}; //exports.updateRubro

exports.setBorradoRubro = (id, borrado) => {
    return new Promise((resolve, reject) => {
        rubrosDB.setBorradoRubro(id, borrado);
    })
        .then((rubro) => {
            resolve(rubro);
        })
        .catch((err) => {
            reject(err);
        });
};//exports.setBorradoRubro

exports.hardDeleteRubro = (id) => {
    return new Promise((resolve, reject) => {
        rubrosDB
            .hardDeleteRubro(id)
            .then((rubro) => {
                resolve(rubro);
            })
            .catch((err) => {
                reject(err);
            });
    });
};//exports.hardDeleteRubro
