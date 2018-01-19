'use strict';

const express = require('express');
const User = require(__dirname + '/../models/user');

const bearer = require('../lib/bearer-auth');
const bodyParser = require('../lib/body-parser');

const userRouter = module.exports = express.Router();

userRouter.put('/user/:id', bodyParser, (req, res, next) => {

  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'Bad Request'});
  }
  delete req.body._id;
  User.findOneAndUpdate({_id: req.params.id}, req.body)
    .then(user => {
      if(req.files && req.files.length) return user.attachAvatar(req.files);
    }).then(user => res.send(user)) 
    .catch(err => next({statusCode: 404, message: 'Bad Request', error: err}));
});