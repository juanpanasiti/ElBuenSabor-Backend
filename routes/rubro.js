const express = require('express')
const router = express.Router()
const Rubro = require('../models/Rubro')

//GET ACTIVES
router.get('/', async (req, res) => {
    try {
        const rubros = await Rubro.find({borrado: false})
        
        console.log("Todos los rubros encontrados");
        res.json(rubros)
    } catch (err) {
        
        console.log("Error al traer todos los rubros");
        res.json({message: err})
    }
})//Get all actives

//GET 'ERASED'
router.get('/borrados', async (req, res) => {
    try {
        const rubros = await Rubro.find({borrado: true})
        
        console.log("Todos los rubros encontrados");
        res.json(rubros)
    } catch (err) {
        
        console.log("Error al traer todos los rubros");
        res.json({message: err})
    }
})//Get all actives

//GET Rubros Insumos
router.get('/insumos', async (req, res) => {
    try {
        const rubros = await Rubro.find({esRubroInsumo: {$eq: true}})
        res.json(rubros)
    } catch (error) {
        res.json({message: error})
    }
})//Get rubros insumos

//GET Rubros catalogo
router.get('/catalogo', async (req, res) => {
    try {
        const rubros = await Rubro.find({esRubroInsumo: {$eq: false}})
        res.json(rubros)
    } catch (error) {
        res.json({message: error})
    }
})//Get rubros catalogo

//CREATE
router.post('/', async (req, res) => {
    try {
        const rubro = new Rubro({
            denominacion: req.body.denominacion,
            esRubroInsumo: req.body.esRubroInsumo,
            rubroPadreId: req.body.rubroPadreId
        })
        const savedRubro = await rubro.save()
        res.json(savedRubro)
    } catch (error) {
        res.json({message: error})
    }
})//Crear rubro

//Get one
router.get('/:rubroId', async (req, res) => {
    try {
        const rubro = await Rubro.findById(req.params.rubroId)
        res.json(rubro)
    } catch (error) {
        res.json({message: error})
    }
})//Get one

//UPDATE
router.put('/:rubroId', async (req, res) => {
    try {
        const rubro = await Rubro.findById(req.params.rubroId)

        //Actualizar campos
        rubro.denominacion = req.body.denominacion || rubro.denominacion
        rubro.esRubroInsumo = req.body.esRubroInsumo || rubro.esRubroInsumo
        rubro.rubroPadreId = req.body.rubroPadreId || rubro.rubroPadreId

        //Guardar
        const savedRubro = await rubro.save()
        res.json(savedRubro)
    } catch (error) {
        res.json({message: error})
    }
})//Update rubro

//Soft delete
router.put('/delete/:rubroId', async (req, res) => {
    try {
        const rubro = await Rubro.findById(req.params.rubroId)
        
        rubro.borrado = true //Borrado lógico

        const borrado = await rubro.save()
        res.json(borrado)
    } catch (error) {
        res.json({message: error})
    }
})// Soft delete

//Soft undelete
router.put('/undelete/:rubroId', async (req, res) => {
    try {
        const rubro = await Rubro.findById(req.params.rubroId)
        
        rubro.borrado = false //Restaurado lógico

        const borrado = await rubro.save()
        res.json(borrado)
    } catch (error) {
        res.json({message: error})
    }
})// Soft undelete

module.exports = router;