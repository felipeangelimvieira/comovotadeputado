const https = require('./https-promise')

const url = 'https://www.camara.leg.br/SitCamaraWS/Proposicoes.asmx/ListarProposicoesVotadasEmPlenario?ano=2019&tipo=';

console.log(https.get(url));