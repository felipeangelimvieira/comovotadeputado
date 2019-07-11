const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var votoSchema = new Schema({
    deputado_id : Number,
    voto : String
})
var sessaoSchema = new Schema({
    resumo : String,
    data : String,
    hora : String,
    objetivo : String,
    sessao_id : Number,
    votos : [votoSchema]
});

var votacaoSchema = new Schema(
{   proposicao_id: Number,
    sigla : String,
    numero : Number,
    ano : Number,
    sessoes : [sessaoSchema]}, { collection: 'Votacoes' });

var Votacao = mongoose.model('Votacao', votacaoSchema);

module.exports = Votacao;