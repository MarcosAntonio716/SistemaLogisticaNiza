const axios = require('axios');

const MELHOR_ENVIO_URL = 'https://api.melhorenvio.com.br/api/v2/shipping/calculate';

async function calcularFrete({ cep_origem, cep_destino, peso, largura, altura, comprimento, valor_declarado = 0 }) {
    const payload = [
        {
            from: { postal_code: cep_origem },
            to: { postal_code: cep_destino },
            package: {
                weight: peso,
                width: largura,
                height: altura,
                length: comprimento
            },
            insurance_value: valor_declarado,
            own_hand: false,
            receipt: false,
            reverse: false,
            services: ""
        }
    ];

    try {
        const response = await axios.post(
            MELHOR_ENVIO_URL,
            payload,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('❌ Erro na cotação:', error.response.data);
        } else if (error.request) {
            console.error('❌ Erro de conexão com Melhor Envio:', error.request);
        } else {
            console.error('❌ Erro desconhecido:', error.message);
        }
        throw new Error('Erro ao calcular frete');
    }
}

module.exports = { calcularFrete };
