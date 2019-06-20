//const https = require('https');
const https = require('./https-promise')
const propositions = require('./api-congresso/propositions');
const votations = require('./api-congresso/votations');
const congressmen = require('./api-congresso/congressmen');

getDataFromCongress()

async function getDataFromCongress() {
    
    var parsedPropositions = await propositions.get(2019)
    var parsedVotations = await votations.getVotationForPropositions(parsedPropositions);
    var parsedCongressmen = await congressmen.get();
    console.log(parsedVotations);
}