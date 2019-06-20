const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var deputadoSchema = new Schema({
    _id : Number,
    orcamento_id : Number,
    condicao : String,
    email : String,
    partido : String,
    sexo : String,
    comissoes : [String],

})
