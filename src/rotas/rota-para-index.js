const express = require('express')
const router = express.Router()
const { Post, Produto } = require('../db/models')
const moment = require('moment')
moment.locale('pt-br')

router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [{
            model: Produto
        }], raw: true, nest: true
    })
    const postResult = posts.map((post) => prepararResultado(post))
    res.render('pages/posts.ejs', {posts: postResult, layout: 'layouts/layout.ejs'})
})

router.get('/post/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id, 
        {include: [{model: Produto}], raw: true, nest: true})
    res.render('pages/post', {post:prepararResultado(post), layout: 'layouts/layout.ejs'})
})

function prepararResultado(post){
    const result = Object.assign({}, post)
    result.postadoEm = moment(new Date(result.createdAt)).format('DD [de] MMMM [de] yyyy [as] HH:mm')

    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    if (result.produtoId) delete result.produtoId
    if (result.foto === null) result.foto = '/static/imagens-padrão/template-imagem.jpg'
    if (result.Produto){
        if (result.Produto.id) delete result.Produto.id
        if (result.Produto.createdAt) delete result.Produto.createdAt
        if (result.Produto.updatedAt) delete result.Produto.updatedAt
        if(result.Produto.tags) result.Produto.tags = result.Produto.tags.split(';')
    }
    return result
}

module.exports = router