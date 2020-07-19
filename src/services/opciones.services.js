const { unidadesMedida, estadoPedido, formasPago, nombresRoles } = require("../data/static/models.options.statics")
const { logError } = require("../config/logger.config")

exports.getUnidadesMedida = () => {
    return new Promise((resolve,reject) => {
        try {
            resolve(unidadesMedida())
        } catch (error) {
            logError(`Error -> opciones.services -> getUnidadesMedida -> ${error}`)
            reject(error)
        }
    })
}//exports.getUnidadesMedida

exports.getEstadoPedido = () => {
    return new Promise((resolve,reject) => {
        try {
            resolve(estadoPedido())
        } catch (error) {
            logError(`Error -> opciones.services -> getEstadoPedido -> ${error}`)
            reject(error)
        }
    })
}//exports.getEstadoPedido

exports.getFormasPago = () => {
    return new Promise((resolve,reject) => {
        try {
            resolve(formasPago())
        } catch (error) {
            logError(`Error -> opciones.services -> getFormasPago -> ${error}`)
            reject(error)
        }
    })
}//exports.getFormasPago

exports.getNombresRoles = () => {
    return new Promise((resolve,reject) => {
        try {
            resolve(nombresRoles())
        } catch (error) {
            logError(`Error -> opciones.services -> getNombresRoles -> ${error}`)
            reject(error)
        }
    })
}//exports.getNombresRoles