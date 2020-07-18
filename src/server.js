const http = require('http')
const app = require('./app')
const {port, name} = require('./config/connection.config')
const {logInfo} = require('./config/logger.config')

const server = http.createServer(app)

server.listen(port)
logInfo(`Server '${name}' up and running at port ${port}`)