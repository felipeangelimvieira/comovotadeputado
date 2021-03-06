var MONGODB_URL;
if (process.env.NODE_ENV === "production") {
    MONGODB_URL = process.env.MONGODB_URL;
}
else {
    MONGODB_URL = require('../mongodb.config').url;
}

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

    congressmen = congressmen.map( x => {
        x.nomeParlamentar = toCamelCase(x.nomeParlamentar);
        return x
    });

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
           numero : votation.numero}, votation, {upsert : true, new: true},
           (err, doc, res) => {
               if (err) {
                   console.log(err);
                   reject(err);
               }
               else{
                   resolve(1);
               }
           });
});}
    

/*
function insertVotationIfNotExists2(votation) {
    return new Promise(function(resolve, reject) {

        Votacao.findOne({sigla : votation.sigla,
            ano : votation.ano,
           numero : votation.numero},
            (err, doc) => {
                if (!err) {
                    
                    if ((doc.sessoes.length == votation.sessoes.length) && doc) 
                    {
                        resolve(0)
                    }
                    else if (doc) {
                    
                    Votacao.findOneAndUpdate({sigla : votation.sigla,
                        ano : votation.ano,
                       numero : votation.numero}, { $set : {sessoes : votation.sessoes}},
                       {}, (err, doc, res) => {
                           if (err){
                               console.log(err);
                               reject(err);
                           }
                           else{
                            resolve(1);
                           }
                       });
                    }

                    else {
                        let instance = new Votacao(votation);
                        instance.save( (err, res) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        resolve(1);
                        });
                    }
                }
                else{
                    reject(err);
                }
           });


})}

*/
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

function toCamelCase(string) {

    var split = string.split(' ');
    var new_word = [];
    for (var i = 0; i < split.length; i++) {
      var word = split[i];
      if (word.length > 0)
{
      if (word === 'de' || word === 'das' || word === 'dos') {
        new_word.push(word);
      }
      else {
        new_word.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
      }
}}
    return new_word.join(' ')
  
  }

module.exports = {
    connect : connect,
    checkAndUpdateDatabase : checkAndUpdateDatabase,
}