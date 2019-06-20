const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var proposicaoSchema = new Schema({
    tipo : String,
    ano : Number,
    numero : Number,
    _id : Number,
    tema : String,
    ementa : String,
    explicacaoEmenta : String,
    link : String,
    autor : String,
    id_autor : Number,
})

var Proposicao = mongoose.model('Proposicao', proposicaoSchema);

module.exports = {
    Proposicao : Proposicao,
}