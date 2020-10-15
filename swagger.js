const serverless = require('serverless-http')
const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/swagger', (req, res) => {
    console.log(swaggerUi.serve)
    console.log(swaggerUi.setup(swaggerDocument))
    res.send('Hola mundo con expressJS')
})


module.exports.swagger = serverless(app)