const Joi = require('joi');

const schema = Joi.object({
    cep_origem: Joi.string().required(),
    cep_destino: Joi.string().required(),
    peso: Joi.number().positive().required(),
    altura: Joi.number().positive().required(),
    largura: Joi.number().positive().required(),
    comprimento: Joi.number().positive().required(),
    valor_declarado: Joi.number().min(0)
});
