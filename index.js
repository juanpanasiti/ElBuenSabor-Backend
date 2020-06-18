const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db_tools = require('./tools/db_tools')
const cors = require('cors')
const config = require('./config.json')

const corsOptions = {
    origin: true,
    credentials: true
}
app.use(cors(corsOptions))

db_tools.DBConnectMongoose()
    .then(() => {
        const routes = require('./routes/routes') //Acá se definen los endpoints de la api-rest

        //Configurar body-parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())// podria ser .json({limit: '10mb'}) ???

        routes.assignRoutes(app)

        app.listen(config.server_config.port)
        console.log(`${config.server_config.name} listo en el puerto: ${config.server_config.port}`);
        
    })
    .catch(err => {
        console.log(`Error: ${err}`);   
    })
