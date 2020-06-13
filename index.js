const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

app.use(cors())
app.use(bodyParser.json())

//Rutas
const RubrosRoutes = require('./routes/rubro')
app.use('/api/rubros', RubrosRoutes)

//Conección a la BD
mongoose.connect(
    process.env.DB_CONN,
    { useNewUrlParser: true},
    () => console.log(`Conectado a la base de datos ${process.env.DB_NAME}`)
)
const PORT = process.env.DEF_PORT || 3001
app.listen(PORT, () => console.log(`Server listo y escuchando en el puerto ${PORT}!!`))