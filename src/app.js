const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const {logInfo} = require('./config/logger.config')
const {db_conn, db_name} = require('./config/connection.config')


const app = express()
app.use(bodyParser.json())
app.use(cors())

//Imports routes
const routes = require('./routes/routes')
routes.assignRoutes(app)

//Connect to DB
mongoose.connect(
    db_conn,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => logInfo(`Connected to ${db_name}!`)
)