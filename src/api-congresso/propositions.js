const xml2js = require('xml2js');
const https = require('./https-promise')

async function get(year = 2019) {
    let url = `https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ListarProposicoesVotadasEmPlenario?ano=${year}&tipo=`;
    parsedPropositions = await parseData(await https.get(url));
    parsedPropositions = Array.from(new Set(parsedPropositions.map(x=> x.codigo)))
    .map( codigo =>{
        prop = parsedPropositions.find(x => x.codigo == codigo)
        return {
            tipo: prop.tipo,
            numero: prop.numero,
            ano: prop.ano,
            codigo: prop.codigo,
            data: prop.data,
        }
    });
    parsedPropositions = Promise.all(parsedPropositions.map(x=> getDetailedInfo(x.codigo))); 
    
    return parsedPropositions
    
}

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
                proposicao_id : parseInt(result['idProposicao']),
                tema : result['tema'][0],
                ementa : result['Ementa'][0],
                explicacaoEmenta : result['ExplicacaoEmenta'][0],
                link : result['LinkInteiroTeor'][0],
                autor : result['Autor'][0],
                id_autor : parseInt(result['ideCadastro']) || 0,
            };
           resolve(final_obj)
        });
    });
    
    
}




module.exports = {
    parseData : parseData,
    getDetailedInfo : getDetailedInfo,
    get : get,
}