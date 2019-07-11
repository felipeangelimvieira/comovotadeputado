const propositions = require('./propositions');
const votations = require('./votations');
const congressmen = require('./congressmen');

async function getDataFromCongress(year = 2019) {
    
    var parsedPropositions = await propositions.get(year);
    var parsedVotations = await votations.getVotationForPropositions(parsedPropositions);
    var parsedCongressmen = await congressmen.get();
    return {
         propositions : parsedPropositions,
         votations : parsedVotations,
         congressmen : parsedCongressmen};
}

module.exports = {
    getDataFromCongress : getDataFromCongress,
}