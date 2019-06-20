const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sessaoSchema = new Schema({
    resumo : String,
    data : String,
    hora : String,
    objetivo : String,
    sessao_id : Number,
    votos : {   
        deputado_id : Number,
        voto : String,
    }
});

var votacaoSchema = new Schema(
{   sigla : String,
    numero : Number,
    ano : Number,
    sessoes : [sessaoSchema]}, { collection: 'Votacoes' });

var Votacao = mongoose.model('Votacao', votacaoSchema);

module.exports = Votacao;