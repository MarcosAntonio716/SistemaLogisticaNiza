const express = require('express');
const router = express.Router();
const axios = require('axios');

// Rota para calcular frete
router.post('/cotacao', async (req, res) => {
    const { cep_origem, cep_destino, peso, altura, largura, comprimento } = req.body;

    const shipmentData = [
        {
            from: { postal_code: cep_origem },
            to: { postal_code: cep_destino },
            package: {
                weight: peso,
                width: largura,
                height: altura,
                length: comprimento
            },
            insurance_value: 0,
            own_hand: false,
            receipt: false,
            reverse: false,
            services: ""
        }
    ];

    try {
        const response = await axios.post(
            'https://api.melhorenvio.com.br/api/v2/me/shipment/preview',
            shipmentData,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error('❌ Erro na cotação:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Erro na cotação',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;
