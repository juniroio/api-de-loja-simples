const express = require('express');
const rotaParaProduto = require('./rotas/rota-para-produto');
const rotaPost = require('./rotas/rota-post');
var expressLayouts = require('express-ejs-layouts');
const indexRoute = require('./rotas/rota-para-index');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');
require('dotenv').config();



const app = express()

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())
app.set('view engine', 'ejs')

app.set('layout', 'layouts/layout')

app.use('/static', express.static('public'))

app.get('/api', (req, res) => {
    res.json({msg: "Hello from Express!"})
})
app.use('/api/produto', rotaParaProduto)
app.use('/api/posts', rotaPost)

app.use(expressLayouts)

app.use('/', indexRoute)

app.listen(8080, () => {
    console.log('Servidor pronto na porta 8080')
})
