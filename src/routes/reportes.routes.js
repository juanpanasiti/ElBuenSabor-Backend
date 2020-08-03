const reportesService = require('../services/reportes.services')
const { logError, logWarning } = require('../config/logger.config')

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
    res.status(400).json({message: "Aun no funciona"})
}//getRankingPlatos

exports.getPedidosPorCliente = (req,res) => {
    res.status(400).json({message: "Aun no funciona"})
}//getPedidosPorCliente



//Reportes para DESCARGAR
exports.getExcelArticulosParaComprar = (req,res) => {
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
    res.status(400).json({message: "Aun no funciona"})
}//getExcelRankingPlatos

exports.getExcelPedidosPorCliente = (req,res) => {
    res.status(400).json({message: "Aun no funciona"})
}//getExcelPedidosPorCliente