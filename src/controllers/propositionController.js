const Proposicao = require('../db/models/proposicao');


module.exports = {
    getProposicao : (req, res, next) => {
        const { sigla, numero, ano } = req.params;
        //Votacao.find({}, (err,doc) => res.send(doc))
        
        Proposicao.findOne({tipo: sigla,
             numero: numero,
             ano : ano}, (err, proposicao) => {
        if (err) {
            res.send(err);
        }
        else {
            console.log(proposicao);
        res.send(proposicao)
        }
    });}
}
