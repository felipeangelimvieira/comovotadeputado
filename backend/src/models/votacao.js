const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sessaoSchema = new Schema({
    resumo : String,
    data : String,
    hora : String,
    objetivo : String,
    _id : Number,
    votos : {   
        deputado_id : Number,
        voto : String,
    }
});

var votacaoSchema = new Schema(
{   sigla : String,
    numero : Number,
    ano : Number,
    votacoes : [sessaoSchema]});

var Votacao = mongoose.model('Votacao', votacaoSchema);

module.exports = {
    Votacao : Votacao,
}