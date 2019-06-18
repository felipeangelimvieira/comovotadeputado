const xml2js = require('xml2js');

xmlParser = new xml2js.Parser();
xmlParser.on('error', err => console.log('Parser error', err));

var getPropInfo = function(proposicao) {
    proposicao = proposicao.nomeProposicao[0].split('/');
    ano = parseInt(proposicao[1]);
    tipo = proposicao[0].split(' ')[0];
    numero = parseInt(proposicao[0].split(' ')[1]);

    return [tipo, numero, ano]
}
var getPropNumber = function(proposicao) {
    return parseInt(proposicao.nomeProposicao.split('/')[0].split(' ')[1], 10)
}

var getPropYear = function(proposicao) {
    return parseInt(proposicao.nomeProposicao.split('/')[1], 10)
}

var parseProposicao = function(proposicao) {

    /* Recebe um objeto JS com propriedades 
    codProposicao, nomeProposicao e dataVotacao
    e retorna outro com propriedades
    tipo, numero, ano, codigo e dataVotacao
    */

   var [tipo, numero, ano] = getPropInfo(proposicao);
   var proposicao_ = { 
       tipo: tipo,
       numero : numero,
       ano : ano,
       codigo : parseInt(proposicao.codProposicao[0]),
       data : proposicao.dataVotacao[0],
   }

   return proposicao_

}

parseData = async function(data, cb) {

    /*  Recebe xml da API do congresso
        e retorna um array com objetos
        de propriedades tipo, numero,
        ano, codigo e dataVotacao
    */

    xmlParser.parseString(data, (err, result) => {
        if (err) {
            console.log(err);
        }
       cb(result.proposicoes.proposicao.map(parseProposicao))
    });

}

module.exports = {
    parseData : parseData
}