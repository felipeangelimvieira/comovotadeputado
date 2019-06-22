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
    
    await mongoose.connection.dropDatabase();

    await start();

    mongoose.connection.close();
}

async function start() {
    console.log('Starting database');
    var { votations, propositions, congressmen } = await getDataFromCongress();
    console.log("got data")
    
    promises = [createCollection(votations,Votacao),
                createCollection(propositions, Proposicao),
                createCollection(congressmen, Deputado)];

    console.log(promises)
    
    return Promise.all(promises);
}

function createCollection(collectionArray, Model) {
    promises = collectionArray.map(x =>
        {   return new Promise( function (resolve, reject) { 
            let collection = new Model(x)
            collection.save( (err, res) => {
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

function findModelInstances(model) {

}
function checkAndUpdateDatabase() {
    updatePromise = new Promise(function(resolve, reject) {  
        Proposicao.find({}, (err, res) => {
            if (err) {
                throw Error(err)
            }
            //await Promise.all(res.map(insertPropositionIfNotExists));
        });
    });

}

function insertPropositionIfNotExists(proposition) {
    return new Promise(function(resolve, reject) { 
    query = Proposicao.where({numero : proposition.numero, ano : proposition.ano});
    query.findOne((err, res) => {
        if (!err) 
        {
            if (!res) 
            {
                let proposition = new Proposicao(proposition);
                proposition.save( (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(res);
                });
            }
        }
        else
        {
            console.log(err);
        }
});
});

}
module.exports = {
    connect : connect,
}