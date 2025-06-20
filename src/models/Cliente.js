const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf_cnpj: {
        type: String,
        required: true
    },
    telefone: String,
    email: String,
    endereco: {
        rua: String,
        numero: String,
        bairro: String,
        cidade: String,
        estado: String,
        cep: String
    },
    observacoes: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Cliente', ClienteSchema);
