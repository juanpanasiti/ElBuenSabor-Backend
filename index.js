const express = require('express')
const app = express()
const jwt = require('express-jwt')
const cors = require('cors')

app.use(cors())

const authCheck = jwt({
    secret: new Buffer('wUZAk_2O6IJi71t6kstCAj_WyemLYVMfkO7FVjITHgmsEcMVkGsu0F1Aj_ay8m2R'),
    audience: 'Of2ZREV714JfLeKoqTOdQCnGSou3yFi8'
})

app.get('/api/public', (req,res) => {
    res.json({message: "es publico"})
})
app.get('/api/private',authCheck, (req,res) => {
    res.json({message: "es privado"})
})

app.listen(3001, () => console.log("Server Up and running!!"))