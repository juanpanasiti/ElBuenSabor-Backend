const opcionesService = require('../services/opciones.services')
const { logError, logSuccess } = require('../config/logger.config')

exports.getUnidadesMedida = (req,res) => {
    opcionesService.getUnidadesMedida().then((opciones) => {
        logSuccess("Exito")
        res.status(200).json(opciones)
    })
    .catch((error) => {
        logError(`${error}`)
        res.status(404).json(error)
    })
}//exports.getUnidadesMedida

exports.getEstadoPedido = (req,res) => {
    opcionesService.getEstadoPedido().then((opciones) => {
        logSuccess("Exito")
        res.status(200).json(opciones)
    })
    .catch((error) => {
        logError(`${error}`)
        res.status(404).json(error)
    })
    
}//exports.getEstadoPedido

exports.getFormasPago = (req,res) => {
    opcionesService.getFormasPago().then((opciones) => {
        logSuccess("Exito")
        res.status(200).json(opciones)
    })
    .catch((error) => {
        logError(`${error}`)
        res.status(404).json(error)
    })
}//exports.getFormasPago

exports.getNombresRoles = (req,res) => {
    opcionesService.getNombresRoles().then((opciones) => {
        logSuccess("Exito")
        res.status(200).json(opciones)
    })
    .catch((error) => {
        logError(`${error}`)
        res.status(404).json(error)
    })
}//exports.getNombresRoles
