const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var deputadoSchema = new Schema({
    nome : String,
    nomeParlamentar: String,
    deputado_id : Number,
    orcamento_id : Number,
    condicao : String,
    email : String,
    partido : String,
    sexo : String,
    comissoes : [String],

}, { collection: 'Deputados' });

var Deputado = mongoose.model('Deputado', deputadoSchema);

module.exports = Deputado;