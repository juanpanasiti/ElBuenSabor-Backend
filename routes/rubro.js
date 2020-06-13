const express = require('express')
const router = express.Router()
const Rubro = require('../models/Rubro')

//GET ALL
router.get('/', async (req, res) => {
    try {
        const rubros = await Rubro.find()
        res.json(rubros)
    } catch (error) {
        res.json({message: error})
    }
})//Get all

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
router.get('/insumos', async (req, res) => {
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

module.exports = router;