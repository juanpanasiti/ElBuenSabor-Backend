const express = require('express')
const app = express()

app.use('/', () => {
    console.log("OK!")
})
app.listen(3001, () => console.log("Server Up and running!!"))