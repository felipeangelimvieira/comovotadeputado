const Votacao = require('../db/models/votacao');


module.exports = {
    getVotes : (req, res, next) => {
        let id = parseInt(req.params.id);
        //Votacao.find({}, (err,doc) => res.send(doc))
        
        Votacao.aggregate([
            {$unwind : "$sessoes"},
            {$unwind : "$sessoes.votos"},
            {$match : { "sessoes.votos.deputado_id" : id }},
    ], (err, doc) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log(doc);
        res.send(doc)
        }
    });}
}
