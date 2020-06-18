const rubrosDomain = require("../domain/rubros.domain");

exports.createRubro = (req, res) => {
    const rubroData = req.body;

    rubrosDomain
        .createRubro(rubroData)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.createRubro

exports.getRubros = (req, res) => {
    rubrosDomain
        .getRubros(false)
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubros
exports.getRubrosBorrados = (req, res) => {
    rubrosDomain
        .getRubros(true)
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubros

exports.getRubrosInsumo = (req, res) => {
    rubrosDomain
        .getRubrosPorTipo(true) //True para insumos, false para catálogo
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubrosInsumo

exports.getRubrosCatalogo = (req, res) => {
    rubrosDomain
        .getRubrosPorTipo(false) //True para insumos, false para catálogo
        .then((rubros) => {
            res.json(rubros);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.getRubrosInsumo

exports.getRubro = (req, res) => {
    rubrosDomain
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
    rubrosDomain
        .updateRubro(req.params.id, rubroData)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.updateRubro

exports.softDeleteRubro = (req, res) => {
    rubrosDomain
        .setBorradoRubro(req.params.id, true)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.softDeleteRubro

exports.softUndeleteRubro = (req, res) => {
    rubrosDomain
        .setBorradoRubro(req.params.id, false )
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.softUndeleteRubro

exports.hardDeleteRubro = (req, res) => {
    rubrosDomain
        .hardDeleteRubro(req.params.id)
        .then((rubro) => {
            res.json(rubro);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
}; //exports.hardDeleteRubro
