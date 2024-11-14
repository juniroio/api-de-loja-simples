const Ajv = require('ajv')
const ajv = new Ajv()
const postSchema = require('../schema/post-schema')


const validate = ajv.compile(postSchema)
function validarPost(req, res, next){
    const post = req.body
    const valid = validate(post)
    if (valid){
        next()
    }else{
        res.status(400).json({msg: "Dados inválidos", erros: validate.errors})
        console.log(req.body)
    }
}

module.exports = validarPost