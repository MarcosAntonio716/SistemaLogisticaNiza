const express = require('express');
const router = express.Router();
const { calcularFrete } = require('../services/melhorEnvioService');

router.post('/cotacao', async (req, res) => {
    const { cep_origem, cep_destino, peso, altura, largura, comprimento, valor_declarado } = req.body;

    try {
        const resultado = await calcularFrete({
            cep_origem,
            cep_destino,
            peso,
            altura,
            largura,
            comprimento,
            valor_declarado
        });
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Erro na cotação', details: error.message });
    }
});

module.exports = router;
