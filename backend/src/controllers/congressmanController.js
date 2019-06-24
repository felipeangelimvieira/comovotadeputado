const Deputado = require('../db/models/deputado');

module.exports = {

    getCongressmen : (req, res, next) => {
        Deputado.find({}, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                else {
                    res.send(doc);
                }
            });
    }
}