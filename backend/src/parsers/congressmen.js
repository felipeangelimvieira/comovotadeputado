const xml2js = require('xml2js');
const https = require('../https-promise')


async function get() {

    url_deputados = 'https://www.camara.leg.br/SitCamaraWS/Deputados.asmx/ObterDeputados'
    deputados = parseData(await https.get(url_deputados));
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
       resolve(result.proposicoes.proposicao.map(parseProposition))
    });
    });
}