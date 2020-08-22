const reportesService = require('../services/reportes.services')
const { logError, logWarning, logInfo } = require('../config/logger.config')

//Reportes para MOSTRAR
exports.getArticulosParaComprar = (req,res) => {
    reportesService.getArticulosParaComprar()
    .then((articulos) => {
        res.status(200).json(articulos)
    })
    .catch((error) => {
        logError(`Error -> reportes.routes -> getArticulosParaComprar -> ${error}`)
        res.status(400).json(error)
    })
}//getArticulosParaComprar

exports.getRecaudaciones = (req,res) => {
    const desde = new Date(req.body.fecha_desde)
    //const desde = req.body.fecha_desde
    const hasta = new Date(req.body.fecha_hasta)
    //const hasta = req.body.fecha_hasta

    reportesService.getRecaudaciones(desde,hasta)
    .then((reporte) => {
        res.status(200).json(reporte)
    })
    .catch((error) => {
        logError(`Error -> reportes.routes -> getRecaudaciones -> ${error}`)
        res.status(400).json(error)
    })
}//getRecaudaciones

exports.getRankingPlatos = (req,res) => {
    const desde = new Date(req.body.fecha_desde)
    const hasta = new Date(req.body.fecha_hasta)

    reportesService.getRankingPlatos(desde,hasta)
    .then((reporte) => {
        res.status(200).json(reporte)
    })
    .catch((error) => {
        logError(`Error -> reportes.routes -> getRankingPlatos -> ${error}`)
        res.status(400).json(error)
    })
}//getRankingPlatos

exports.getPedidosPorCliente = (req,res) => {
    const desde = new Date(req.body.fecha_desde)
    const hasta = new Date(req.body.fecha_hasta)
    logWarning("BODY:")
    logWarning(req.body)
    reportesService.getPedidosPorCliente(desde,hasta)
    .then((reporte) => {
        res.status(200).json(reporte)
    })
    .catch((error) => {
        logError(`Error -> reportes.routes -> getRankingPlatos -> ${error}`)
        res.status(400).json(error)
    })
}//getPedidosPorCliente



//Reportes para DESCARGAR
exports.getExcelArticulosParaComprar = (req,res) => {
    logInfo("Generando excel de reporte de stock")
    reportesService.getExcelArticulosParaComprar()
    .then((reporte) => {
        res.status(200).download(reporte)
    })
    .catch((error) => {
        res.status(400).json({error: `Error al crear el excel ${error}`})
    })
}//getExcelArticulosParaComprar

exports.getExcelRecaudaciones = (req,res) => {
    const desde = new Date(req.body.fecha_desde)
    //const desde = req.body.fecha_desde
    const hasta = new Date(req.body.fecha_hasta)
    //const hasta = req.body.fecha_hasta
    reportesService.getExcelRecaudaciones(desde,hasta)
    .then((reporte) => {
        res.status(200).download(reporte)
    })
    .catch((error) => {
        res.status(400).json({error: `Error al crear el excel ${error}`})
    })
}//getExcelRecaudaciones

exports.getExcelRankingPlatos = (req,res) => {
    const desde = new Date(req.body.fecha_desde)
    const hasta = new Date(req.body.fecha_hasta)
    reportesService.getExcelRankingPlatos(desde,hasta)
    .then((reporte) => {
        res.status(200).download(reporte)
    })
    .catch((error) => {
        res.status(400).json({error: `Error al crear el excel ${error}`})
    })
}//getExcelRankingPlatos

exports.getExcelPedidosPorCliente = (req,res) => {
    const desde = new Date(req.body.fecha_desde)
    const hasta = new Date(req.body.fecha_hasta)
    reportesService.getExcelPedidosPorCliente(desde,hasta)
    .then((reporte) => {
        res.status(200).download(reporte)
    })
    .catch((error) => {
        res.status(400).json({error: `Error al crear el excel ${error}`})
    })
}//getExcelPedidosPorCliente