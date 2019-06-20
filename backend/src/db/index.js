const MONGODB_URL = require('../mongodb.config').url;
const mongoose = require('mongoose');
const { getDataFromCongress } = require('../api-congresso/congress-data');

async function connect() {

    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true
    });
    
    return new Promise(function(resolve, reject) { 
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to mongo server.');
        //trying to get collection names
        mongoose.connection.db.listCollections().toArray(function (err, names) {
            if (err) {
                reject(err);
            }
            console.log(names); // [{ name: 'dbname.myCollection' }]
            if (names.length == 0) {
                start()
            }
            resolve('Resolved')
        });
    });
});
}

async function start() {
    var { votations, propositions, congressmen } = await getDataFromCongress();

    console.log("Votacoes",votations);
    console.log("Finished test");
    mongoose.connection.close();

}


module.exports = {
    connect : connect,
}