const xml2js = require('xml2js');
const https = require('../https-promise')

function parseData(data) {

    /*  Recebe xml da API do congresso
        e retorna um array com objetos
        de propriedades tipo, numero,
        ano, codigo e dataVotacao
    */
    let xmlParser = new xml2js.Parser();
    xmlParser.on('error', err => console.log('Parser error', err));
    return new Promise( function(resolve, reject) 
    {
    xmlParser.parseString(data, (err, result) => {
        if (err) {
            reject(err);
        }
       resolve(result.proposicoes.proposicao.map(parseProposition))
    });
    });

}

var parseProposition = function(proposicao) {

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


async function getDetailedInfo(codigo) {
    
    let xmlParser = new xml2js.Parser();
    xmlParser.on('error', err => console.log('Parser error', err));
    let url = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterProposicaoPorID?IdProp=';
    
    url += codigo;

    data = await https.get(url);

    return new Promise(function(resolve, reject) {
        xmlParser.parseString(data, (err, result) => {
            if (err) {
                reject(err);
            }

            result = result['proposicao']
            final_obj = {
                tipo : result['$'].tipo.replace(/ /g,''),
                ano : parseInt(result['$'].ano),
                numero : parseInt(result['$'].numero),
                codigo : parseInt(result['idProposicao']),
                tema : result['tema'],
                ementa : result['Ementa'],
                explicacaoEmenta : result['ExplicacaoEmenta'],
                link : result['LinkInteiroTeor'],
                autor : result['Autor'],
                id_autor : parseInt(result['ideCadastro']),

            };
           resolve(final_obj)
        });
    });
    
    
}




module.exports = {
    parseData : parseData,
    getDetailedInfo : getDetailedInfo,
}