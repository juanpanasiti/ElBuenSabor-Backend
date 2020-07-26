const rubrosService = require("../services/rubros.services");
const { logError } = require("../config/logger.config");

exports.createRubro = (req, res) => {
    const rubroData = req.body;
    
    rubrosService
        .createRubro(rubroData)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            logError("Error -> rubro.routes -> createRubro " + err);
            res.status(400).json(err);
        });
}; //exports.createRubro

exports.getRubrosRaiz = (req, res) => {
    rubrosService
        .getRubrosPorPadre(null)
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubrosRaiz

exports.getRubrosHijos = (req, res) => {
    rubrosService
        .getRubrosPorPadre(req.params.id)
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubrosRaiz

exports.getRubros = (req, res) => {
    rubrosService
        .getRubros(false)
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubros

exports.getRubrosBorrados = (req, res) => {
    rubrosService
        .getRubros(true)
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubros

exports.getRubrosInsumo = (req, res) => {
    rubrosService
        .getRubrosPorTipo(true) //True para insumos, false para catálogo
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubrosInsumo

exports.getRubrosCatalogo = (req, res) => {
    rubrosService
        .getRubrosPorTipo(false) //True para insumos, false para catálogo
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubrosInsumo

exports.getRubro = (req, res) => {
    rubrosService
        .getRubro(req.params.id)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubro

exports.updateRubro = (req, res) => {
    const rubroData = req.body;
    rubrosService
        .updateRubro(req.params.id, rubroData)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            console.log("Error en rubro.routes -> updateRubro " + err);
            
            res.status(400).json(err);
        });
}; //exports.updateRubro

exports.softDeleteRubro = (req, res) => {
    rubrosService
        .setBorradoRubro(req.params.id, true)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.softDeleteRubro

exports.softUndeleteRubro = (req, res) => {
    rubrosService
        .setBorradoRubro(req.params.id, false )
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.softUndeleteRubro

exports.hardDeleteRubro = (req, res) => {
    rubrosService
        .hardDeleteRubro(req.params.id)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            console.log("Error en rubro.routes -> hardDeleteRubro " + err);
            res.status(400).json(err);
        });
}; //exports.hardDeleteRubro
