//const https = require('https');
const https = require('./https-promise')
const propositions = require('./parsers/propositions')
const votations = require('./parsers/votations')
// const url = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterVotacaoProposicao?tipo=PEC&numero=34&ano=2019';

// Proposiçoes votadas em plenário, link:


var parsedPropositions;

getDataFromCongress()


async function getDataFromCongress() {
    
    const url = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ListarProposicoesVotadasEmPlenario?ano=2019&tipo=';
    parsedPropositions = await propositions.parseData(await https.get(url));
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
    console.log(parsedPropositions.length)
    parsedPropositions = parsedPropositions.map(x=> propositions.getDetailedInfo(x.codigo));
    console.log(parsedPropositions.length)
    parsedVotations = await votations.parseData(await votations.getVotationForPropositions(parsedPropositions));
    //parsedPropositions = await propositions.getDetailedInfo(parsedPropositions[0].codigo));
    console.log(parsedVotations);

}