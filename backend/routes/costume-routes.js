'use strict';

const express = require('express');
const Costume = require(__dirname + '/../models/costume');
const User = require(__dirname + '/../models/user');

const bearer = require('../lib/bearer-auth');
const jsonParser = require('body-parser').json();

const costumeRouter = module.exports = express.Router();


costumeRouter.post('/costumes', jsonParser, bearer, (req, res, next) => {
  console.log('hi from post /costumes')
  
  let newCostume = new Costume(req.body);

  newCostume.save()
    .then(data => res.send(data))
    .catch(err => next({statusCode: 400, message: err, error: err}));

});

costumeRouter.get('/costumes', bearer,  (req, res, next) => {
  console.log('Hi from get /costumes')
  let cosObj = req.params || {};
  Costume.find(cosObj)
    .then(costume => res.send(costume))
    .catch(err => next({statusCode: 500, error: err}));
});


costumeRouter.get('/costume/:id', bearer, (req, res, next) => {
  Costume.findOne({_id: req.params.id})
    .then(costume => res.send(costume))
    .catch(err => next({statusCode: 404, message: 'Not Found', error: err}));
});

costumeRouter.put('/costume/:id', jsonParser, bearer, (req, res, next) => {

  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'Bad Request'});
  }
  delete req.body._id;
  Costume.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(() => res.send('Costume has been updated!'))
    .catch(err => next({statusCode: 404, message: 'Bad Request', error: err}));
});


costumeRouter.delete('/costume/:id', bearer, (req, res, next) => {
  console.log('hello from delete')
  Costume.remove({_id: req.params.id})
    .then(() => res.send('Costume has been deleted'))
    .catch(err => next({statusCode: 500, error: err}));
});
