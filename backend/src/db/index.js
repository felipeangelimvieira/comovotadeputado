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
    
    return new Promise(function(resolve, reject) { 
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
        //trying to get collection names
        mongoose.connection.db.listCollections().toArray(async function (err, names) {
            if (err) {
                reject(err);
            }
            console.log(names.length); // [{ name: 'dbname.myCollection' }]
            if (names.length == 0) {
                await start();
            }
            else {
                console.log(names)
                names.map( collection => mongoose.connection.db.dropDatabase(collection.name));
                mongoose.connection.close();

            }
            resolve('Resolved')
        });
    });
});
}

async function start() {
    console.log('Starting database');
    var { votations, propositions, congressmen } = await getDataFromCongress();

    console.log(`${propositions.length} propositions`);
    console.log(`${votations.length} votations`);
    console.log(`${congressmen.length} congressmen`);
    votations.map(x => new Votacao(x).save( (err, res) => 
    {if (err) {
        Error(err);
    }}));
    var t = propositions.map(x => (new Proposicao(x)).save( (err, res) => 
    {if (err) {
        console.log(err);
        Error(err);
    }}));
    console.log(t.length);
    congressmen.map(x => new Deputado(x).save( (err, res) => 
    {if (err) {
        Error(err);
    }}));
    

    //console.log("Votacoes",votations);
    console.log("Finished test");
    //mongoose.connection.close();

    
}


module.exports = {
    connect : connect,
}