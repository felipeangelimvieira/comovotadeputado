const express = require('express');
const routes = new express.Router();
const congressmanController = require('./controllers/congressmanController');
const votationController = require('./controllers/votationController');
const propositionController = require('./controllers/propositionController');

//routes.get('/deputado/:id', );

routes.get('/deputados', congressmanController.getCongressmen);

//routes.get('/deputados/:id', congressmanController.getCongressman);

routes.get('/deputado/:id/votos/', votationController.getVotes);
//routes.get('/votacoes/', );

//routes.get('/proposicoes', propositionController);


module.exports = routes;