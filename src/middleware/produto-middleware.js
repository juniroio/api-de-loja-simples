const Ajv = require('ajv')
const ajv = new Ajv()
const produtoSchema = require('../schema/produto-schema')


const validate = ajv.compile(produtoSchema)

function validarProduto(req, res, next){
    const produtos = req.body
    const { tags } = req.body
    const body = {
        ...produtos,
        tags: tags.join(';')
    }
    const valid = validate(body)
    if (valid){
        next()
    }else{
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
    }
}

module.exports = validarProduto