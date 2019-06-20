const https = require('./https-promise')
const xml2js = require('xml2js');
xmlParser = new xml2js.Parser();
xmlParser.on('error', err => console.log('Parser error', err));
const endpoint = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterVotacaoProposicao?';

async function getVotationForPropositions(propositions) {

    promises = propositions.map(prop => 
        {
            var url = endpoint;
            url += 'tipo=';
            url += prop.tipo;
            url += '&numero=';
            url += prop.numero;
            url += '&ano=' + prop.ano;

            return https.get(url);
        });

    all_requests = Promise.all(promises);
    return parseData(await all_requests);
}

/*
*   @param {Array<String>} Resposta em XML da API do congresso para
*                           a votação das propostas de 2019
*/
function parseData(data){
    

    return Promise.all(data.map(convertToJson)).then(x=>x.map(formatVotes));
    
    };

function convertToJson(string) {

    return new Promise( function(resolve, reject) {
        xmlParser.parseString(string, (err, result) => {
            if (err) {
                reject(err);
            }
           resolve(result)
        });
    });
}

function formatVotes(proposition) {

    proposicao = proposition.proposicao;

    _votacoes = proposition.proposicao.Votacoes[0].Votacao;
    
    votacoes = [];
    
    
    for (var i = 0; i < _votacoes.length; i++){
        votacao_atual = _votacoes[i];
        votos = votacao_atual.votos[0].Deputado
                .map(x => x['$'])
                .map( obj =>{
                    return {
                    deputado_id : obj.ideCadastro,
                    voto : obj.Voto.replace(/ /g, ''),
                            }
                            });

        votacoes.push( {
            resumo : votacao_atual['$'].Resumo,
            data: votacao_atual['$'].Data,
            hora: votacao_atual['$'].Hora,
            objetivo: votacao_atual['$'].ObjVotacao,
            sessao_id: votacao_atual['$'].codSessao,
            votos : votos,
        })
        
    }

    proposicao_parsed = {
        sigla : proposicao.Sigla[0],
        numero : proposicao.Numero[0],
        ano : proposicao.Ano[0],
        sessoes : votacoes,
    }


    //return proposition.proposicao.Votacoes[0].Votacao[0].votos[0].Deputado[0]['$']
    return proposicao_parsed
}

module.exports = {
    getVotationForPropositions : getVotationForPropositions,
    parseData : parseData,
}