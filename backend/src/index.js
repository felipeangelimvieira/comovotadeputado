//const https = require('https');
const https = require('./https-promise')
const propositions = require('./parsers/propositions')
const votations = require('./parsers/votations')

getDataFromCongress()


async function getDataFromCongress() {
    
    var parsedPropositions = await propositions.get(2019)
    var parsedVotations = await votations.getVotationForPropositions(parsedPropositions);
    var parsedCongressmen = await ;

}