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
    });},

    getVotesAndPropositionDetails : (req, res, next) => {

        let id = parseInt(req.params.id);
        
        Votacao.aggregate([
            {$unwind : "$sessoes"},
            {$unwind : "$sessoes.votos"},
            {$match : { "sessoes.votos.deputado_id" : id }},
            {$lookup: {
             from: "Proposicoes",
             localField : "proposicao_id",
             foreignField: "proposicao_id",
             as: "detalhes"
            }}], (err, doc) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log(doc);
        res.send(doc)
        }
    });
    }

}
