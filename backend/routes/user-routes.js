'use strict';

const express = require('express');
const User = require(__dirname + '/../models/user');

const bearer = require('../lib/bearer-auth');
const bodyParser = require('../lib/body-parser');

const userRouter = module.exports = express.Router();

userRouter.put('/user/:id', bodyParser, (req, res, next) => {

  console.log('req.body in USER ROUTES>>> WHAAAAAAAT?????!!! is ', req.body);

  if(Object.keys(req.body).length === 0 || !req.params.id) {
    next({statusCode:400, message: 'Bad Request'});
  }
  // delete req.body._id;
  User.findOne({_id: req.params.id})
    .then(user => {
      Object.assign(user, req.body);
      user.save();
      if(req.files && req.files.length) return user.attachAvatar(req.files);
    }).then(user => res.send(user)) 
    .catch(err => next({statusCode: 404, message: 'Bad Request', error: err}));
});