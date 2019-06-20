const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var proposicaoSchema = new Schema({
    tipo : String,
    ano : Number,
    numero : Number,
    proposicao_id : Number,
    tema : String,
    ementa : String,
    explicacaoEmenta : String,
    link : String,
    autor : String,
    id_autor : { type : Number, default : -1},
}, { collection: 'Proposicoes' });

var Proposicao = mongoose.model('Proposicao', proposicaoSchema);

module.exports = Proposicao;