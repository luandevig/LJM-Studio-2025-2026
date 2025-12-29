const { Schema, model } = require("mongoose");

const ProdutoSchema_d = new Schema({
    produtoId: {
        type: Number,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    preco: {
        type: Number,
        required: true
    },
    imagem: {
        type: String,
        default: null
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("CadastroDesign", ProdutoSchema_d);
