const https = require('https');
const xml2js = require('xml2js');

xmlParser = new xml2js.Parser();
xmlParser.on('error', err => console.log('Parser error', err));
const endpoint = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterVotacaoProposicao?';

// tipo=PEC&numero=34&ano=2019

function handleVotacao(err, res, votacoes)  {
    if (err) {
        console.log(err);
    }
    else {
    
        console.log(res.proposicao.Votacoes[0].Votacao)

    }
}


listaPropsCallback = async function(props) {
    votacoes = {}
    props.map(prop => {

        new Promise( function(resolve, reject) 
        {
            var url = endpoint;
            url += 'tipo=';
            url += prop.tipo;
            url += '&numero=';
            url += prop.numero;
            url += '&ano=' + prop.ano;
            
            https.get(url, res => {handleVotacaoRequest(res, url, callback)});
        });
    });
}

var requestVotacao = function(prop, callback) {
    var url = endpoint;
    url += 'tipo=';
    url += prop.tipo;
    url += '&numero=';
    url += prop.numero;
    url += '&ano=' + prop.ano;
    https.get(url, res => {handleVotacaoRequest(res, url, callback)});

}


var handleVotacaoRequest = (res, url, callback, retry = 0) => 
{

    
        if (res.statusCode >= 200 && res.statusCode < 400) 
        {
            let data = '';
            res.on('data', data_ => data += data_);
            res.on('end',  res => 
            {
                xmlParser.parseString(data, (err,res) => callback(err, res))
            });
        }
        else if (retry > 10) {
            reject(Error(`To many retries when requesting to ${url}`))
        }
        else 
        {
            console.log(`StatusCode ${res.statusCode} when requesting to ${url}`);
            console.log(`Waiting 1 sec. Retry number ${retry}.`); 
            setTimeout(() => https.get(url, res => handleVotacaoRequest(res, url, callback, retry + 1)), 1000);
        }
    
}


module.exports = {
    listaPropsCallback : listaPropsCallback,
}