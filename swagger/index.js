const serverless = require('serverless-http')
const express = require('express')
const app = express();


app.get('/swagger', (req, res) => {
    res.send('Hola mundo con expressJS')
})


module.exports.swagger = serverless(app)