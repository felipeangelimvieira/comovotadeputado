const xml2js = require('xml2js');
const https = require('./https-promise')


async function get() {

    url_deputados = 'https://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterDeputados'
    deputados = await parseData(await https.get(url_deputados));
    deputados = deputados.map(x => formatCongressman(x));
    return deputados

}

function parseData(data) {

    let xmlParser = new xml2js.Parser();
    xmlParser.on('error', err => console.log('Parser error', err));
    return new Promise( function(resolve, reject) 
    {
    xmlParser.parseString(data, (err, result) => {
        if (err) {
            reject(err);
        }
       resolve(result.deputados.deputado);
    });
    });
}

function formatCongressman(congressman) {

    return {
        _id : congressman.ideCadastro[0],
        orcamento_id : congressman.codOrcamento[0],
        condicao : congressman.condicao[0],
        email : congressman.email[0],
        partido : congressman.partido[0],
        sexo : congressman.sexo[0],
        comissoes : [],
        urlFoto : congressman.urlFoto[0]
    }
}

async function getDetailedInfo(congressman) {

    let url = `https://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterDetalhesDeputado?ideCadastro=${congressman._id}&numLegislatura=`;
    response = await https.get(url);

    parsedInfo = new Promise( function(resolve, reject) 
    {
    xmlParser.parseString(response, (err, result) => {
        if (err) {
            reject(err);
        }
       resolve(result);
    });
    });

    detailedInfo = await parsedInfo;
    return detailedInfo;

}


module.exports = {
    get : get,
    getDetailedInfo : getDetailedInfo
}