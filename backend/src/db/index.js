const MONGODB_URL = require('../mongodb.config').url;
const mongoose = require('mongoose');
const { getDataFromCongress } = require('../api-congresso/congress-data');
const Deputado = require('./models/deputado');
const Proposicao = require('./models/proposicao');
const Votacao = require('./models/votacao');

async function connect() {

    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useFindAndModify : false
    });

    await connectionIsOpen();
    
    //await mongoose.connection.dropDatabase();
    //console.log(await Proposicao.find({}));

    if ((await getCollections()).length == 0) 
    {
        await start();
    }

    //res = await checkAndUpdateDatabase();
    //console.log(`${res.reduce((acc,newValue) => acc + newValue)} updates.`);
    //mongoose.connection.close();
}

async function start() {
    console.log('Starting database');
    var { votations, propositions, congressmen } = await getDataFromCongress();
    console.log("got data")
    votations[1].sessoes = [votations[1].sessoes[0]];
    console.log(votations[1])
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

function connectionIsOpen() {
    return new Promise(function(resolve, reject) { 
        mongoose.connection.on('open', function (ref) {
                console.log('Connection is open.')
                resolve(true)
            });
        });  
}

async function checkAndUpdateDatabase() {

    var { votations, propositions, congressmen } = await getDataFromCongress();

    console.log("Updating database");

    var propositionPromises = propositions.map(x => insertPropositionIfNotExists(x));
    var votationPromises = votations.map( x => insertVotationIfNotExists(x));
    var congressmanPromises = congressmen.map( x => insertCongressmanIfNotExists(x));

    promises = propositionPromises.concat(votationPromises).concat(congressmanPromises);
    return Promise.all(promises);
}

function insertPropositionIfNotExists(proposition) {
    return new Promise(function(resolve, reject) { 
        query = Proposicao.where({numero : proposition.numero,
                                ano : proposition.ano,
                                tipo : proposition.tipo});
        query.findOne((err, res) => {
            if (!err) 
            {
                if (!res) 
                {
                    let instance = new Proposicao(proposition);
                    instance.save( (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(1);
                    });
                }
                else{
                resolve(0);
                }
            }

            else
            {
                console.log(err);
                reject(err)
            }
    });
    });
}

function insertVotationIfNotExists(votation) {
    return new Promise(function(resolve, reject) {

        Votacao.findOneAndUpdate({sigla : votation.sigla,
            ano : votation.ano,
           numero : votation.numero},
           {'$set' : {'sessoes' : votation.sessoes}}, {},
            (err, doc) => {
                if (!err) {
                    resolve(1);
                }
                else{
                    reject(err);
                }
           });


        query = Votacao.where({sigla : votation.sigla,
                             ano : votation.ano,
                            numero : votation.numero});
        query.findOneAndUpdate((err, res) => {
            if (!err) 
            {
                if (!res) 
                {
                    let instance = new Votacao(votation);
                    instance.save( (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(1);
                    });
                }
                else{
                resolve(0);
                }
            }

            else
            {
                console.log(err);
                reject(err)
            }
    });
    });
}

function insertCongressmanIfNotExists(congressman) {
    return new Promise(function(resolve, reject) { 
        query = Deputado.where({deputado_id : congressman.deputado_id});
        query.findOne((err, res) => {
            if (!err) 
            {
                if (!res) 
                {
                    let instance = new Deputado(congressman);
                    instance.save( (err, res) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    resolve(1);
                    });
                }
                else{
                resolve(0);
                }
            }

            else
            {
                console.log(err);
                reject(err)
            }
    });
    });
}


function getCollections() {
    return new Promise(function(resolve, reject) { 
    mongoose.connection.db.collections(function(err, collections){
        if(err)
        reject(err);
        else{
        resolve(collections);
        }
    });
});
}

module.exports = {
    connect : connect,
}