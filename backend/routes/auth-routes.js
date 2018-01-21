const User = require(__dirname + '/../models/user');
const basicHTTP = require('../lib/basic-http');
const bearer = require('../lib/bearer-auth');
const jsonParser = require('body-parser').json();

const authRouter = module.exports = require('express').Router();

authRouter.post('/signup', jsonParser, (req, res, next) => {
 
  console.log('req.body is ', req.body);
  if(!req.body.username || !req.body.password || !req.body.email) return next(400);

  User.findOne({ username: req.body.username })
  .then(userExists => {
    if(userExists) { 
      console.log('in the userExists');
      return next(400);}
  }).catch(500);

  const password = req.body.password;
  delete req.body.password;

  (new User(req.body)).generateHash(password)
    .then(user => {
      console.log('in new User create, user is ', user)
      user.save();
      let token = user.generateToken();
      console.log('token is ', token);
      res.cookie('auth', token, { maxAge: 900000 });
      res.send({user,token});
    })
    .catch(400);

});

authRouter.get('/login', basicHTTP, (req, res, next) => {
  console.log('req.auth is ', req.auth)
  User.findOne({username: req.auth.username})
    .then(user => {
      if (!user) { 
        next({statusCode: 403, message: 'Invalid Username'});
      }
      user.verifyPassword(req.auth.password)
        .then(user => {
          console.log('user after verify password is ', user);
          
          if(user) {
            let token = user.generateToken();
            res.cookie('auth', token, { maxAge: 900000 });
            console.log('BLIPPP: user is ', user, ' and token is ', token)
            res.send({user, token});
          } 
          else(next(401));
        });
    })
    .catch(next);
  
});

authRouter.get('/validate', bearer, (req, res, next) => {
  console.log('req.user in validate is ', req.user)
  User.findOne({_id: req.user._id})
    .then(user => {
      let token = user.generateToken();
      res.cookie('auth', token, { maxAge: 900000 });
      console.log('user is ', user);
      console.log('res is ', res);
      res.send({user,token});
    })
    .catch(next);
});


  