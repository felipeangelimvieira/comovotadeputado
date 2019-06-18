const https = require('https');
const votacaoParser = require('./parsers/VotacaoParser');
const proprosicaoParser = require('./parsers/ProposicaoParser');

// const url = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ObterVotacaoProposicao?tipo=PEC&numero=34&ano=2019';

// Proposiçoes votadas em plenário, link:
const url = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ListarProposicoesVotadasEmPlenario?ano=2019&tipo=';

var data = '';

var propVotadas;


https.get(url, (res) => 
    {
    if (res.statusCode >= 200 && res.statusCode < 400) 
        {
        res.on('data', data_ => data += data_.toString());
        res.on('end', () => 
            {
             //propVotadas = proprosicaoParser.parseData(data);
             //propVotadas.map(votacaoParser.getVotacao);
             
             proprosicaoParser.parseData(data, votacaoParser.listaPropsCallback);
             
            });
        }
    }
);

