const express = require('express');
const router = express.Router();
const produtoMid = require('../middleware/produto-middleware');
const { Produto } = require('../db/models');
const jwt = require("jsonwebtoken");


router.post('/', produtoMid);
router.put('/', produtoMid);

router.get('/', async (req, res) => {

    const produtos = await Produto.findAll();

    const resultado = produtos.map(prod => prepararResultado(prod.dataValues));

    res.json({ produtos: resultado });
})

router.get('/:id', async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    const resultado = prepararResultado(produto.dataValues);
    res.json({ produtos: resultado });
})

router.post('/', async (req, res) => {
    const { tags } = req.body
    const body = {
        ...req.body,
        tags: tags.join(';')
    }
    const produto = await Produto.create(body);
    if (produto) {
        res.json({ msg: "Produto adicionado com sucesso!" });
    } else {
        res.status(403).json({ msg: "Não foi possivel cadastrar o produto!" });
    }

})

router.delete('/', async (req, res) => {
    const id = req.query.id;
    const produto = await Produto.findByPk(id);
    if (produto) {
        await produto.destroy()
        res.json({ msg: "Produto deletado com sucesso!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
})

router.put('/', async (req, res) => {
    const id = req.query.id;
    const produto = await Produto.findByPk(id);
    if (produto) {
        produto.titulo = req.body.titulo
        produto.texto = req.body.texto
        await produto.save();
        res.json({ msg: "Produto atualizado com sucesso!" });
    } else {
        res.status(400).json({ msg: "Produto não encontrado!" });
    }
})

router.post("/token", async (req, res) => {
    const randomNumber = Math.random();
    const payload = { random: randomNumber };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    res.json({ accessToken: token })
})


function prepararResultado(produto) {
    const result = Object.assign({}, produto);

    if (result.createdAt) delete result.createdAt
    if (result.updatedAt) delete result.updatedAt
    if (result.tags) result.tags = result.tags.split(';')

    return result
}

module.exports = router;

