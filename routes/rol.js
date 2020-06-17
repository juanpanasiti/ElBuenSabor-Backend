const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
require('../models/Rol')

const Rol = mongoose.model('Rol')
//Rutas dentro de '/api/roles'

//Contar registros
router.get('/contar', (req, res) => {
    Rol.countDocuments().then(c => {
        res.json(c);
    }).catch(err => {
        res.json(err)
    })
})
//Create one
router.post('/', (req, res) => {
    Rol.create({
        //usuarioId: req.body.usuarioId
        nombreRol: req.body.nombreRol,
        activo: req.body.activo
    }).then( doc => {
        res.json(doc)
    }).catch( err => {
        res.json(err)
    })
})
//Get all
router.get('/', (req, res) => {
   Rol.find({})//Entre llaves van los filtros
    .then( docs => {
        console.log("Buscando roles.");
        res.json(docs)
    }).catch( err => {
        console.log("Error al buscar roles.");
        res.json(err)
    })
})//Get all

//Get one
router.get('/:id', (req, res) => {
    Rol.findById(req.params.id)
        .then( doc => {
            console.log("Busqueda OK");
            if (doc) {
                console.log(doc);
            } else {
                console.log(`No se encontró ningún Rol con _id ${req.params.id}`);
                
            }
            res.json(doc)
        }).catch( err => {
            console.log(`Error al buscar el rol con id ${req.params.id}`);
            console.log(err);
            
            res.json(err)
        })
})//get one

//Update one
router.put('/:id', (req, res) => {
    Rol.findByIdAndUpdate(req.params.id, {
        nombreRol: req.body.nombreRol,
        activo: req.body.activo
    },{new: true}).then( doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})//update one

//Soft delete one
router.put('/delete/:id', (req, res) => {
    Rol.findByIdAndUpdate(req.params.id, {
        borrado: true
    },{new: true}).then( doc => {
        res.json(doc)
    }).catch(err => {
        res.json(err)
    })
})//Soft delete one



module.exports = router;