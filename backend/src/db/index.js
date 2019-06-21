const MONGODB_URL = require('../mongodb.config').url;
const mongoose = require('mongoose');
const { getDataFromCongress } = require('../api-congresso/congress-data');
const Deputado = require('./models/deputado');
const Proposicao = require('./models/proposicao');
const Votacao = require('./models/votacao');

async function connect() {

    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true
    });

    await connectionIsOpen();
    
    await start();

    //await mongoose.connection.dropDatabase();

    mongoose.connection.close();
}

async function start() {
    console.log('Starting database');
    var { votations, propositions, congressmen } = await getDataFromCongress();
    console.log("got data")
    promises = [createVotationCollection(votations),
                createPropositionCollection(propositions),
                createCongressmenCollection(congressmen)]
    console.log(promises)
    
    return Promise.all(promises);
}

function createVotationCollection(votations) {
    promises = votations.map(x =>
        {   return new Promise( function (resolve, reject) { 
            let votacao = new Votacao(x)
            votacao.save( (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res)
                }
            });
        });
        });
    return Promise.all(promises)
}

function createPropositionCollection(propositions) {
    promises = propositions.map(x =>
        {   return new Promise( function (resolve, reject) { 
            let proposition = new Proposicao(x)
            proposition.save( (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res)
                }
            });
        });
        });
    return Promise.all(promises)
}

function createCongressmenCollection(congressmen) {
    promises = congressmen.map(x =>
        {   return new Promise( function (resolve, reject) { 
            let congressman = new Deputado(x)
            congressman.save( (err, res) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(res)
                }
            });
        });
        });
    return Promise.all(promises)
}

function getCollectionNames() {

    
    return new Promise( function(resolve, reject) { 

        mongoose.connection.db.collections(function(err, collections){
            if(err)
            reject(err);
            else{
            resolve(collections.map(x => x.s.name));
            }


    });
});
}

function connectionIsOpen() {
    return new Promise(function(resolve, reject) { 
        mongoose.connection.on('open', function (ref) {
                console.log('Connection is open.')
                resolve(true)
            });
        });  
}

module.exports = {
    connect : connect,
}