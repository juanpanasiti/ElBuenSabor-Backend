const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv/config')
const utils = require('./tools/utils.tools')

app.use(bodyParser.json())
app.use(cors())

const routes = require('./routes/routes')
routes.assignRoutes(app)
//Connect to DB
mongoose.connect(
    process.env.DB_CONN,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => utils.logSuccess('Connected to MongoDB!')
)

//port
const port = process.env.PORT || 3001
app.listen(port)
utils.logSuccess(`Conectado al puerto ${port}`)