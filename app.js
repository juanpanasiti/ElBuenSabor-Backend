const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv/config')

app.use(bodyParser.json())
app.use(cors())

const routes = require('./routes/routes')
routes.assignRoutes(app)
//Connect to DB
mongoose.connect(
    process.env.DB_CONN,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to MongoDB!')
)

//port
app.listen(3033)