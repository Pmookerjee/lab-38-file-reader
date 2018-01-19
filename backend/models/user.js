'use strict';

const aws = require('../lib/aws');
const mongoose = require('mongoose');
const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  password: {type: String, required: true },
  email: {type: String, required: true, unique: true},
  firstname: {type: String, required: false},
  lastname: {type: String, required: false},
  about: {type: String, required: false},
  avatar: {type: String, required: false},

});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashAsync(password, 10)
    .then((hash) => {
      this.password = hash;
      return this;
    });
};

userSchema.methods.verifyPassword = function(password) {

  return bcrypt.compareAsync(password, this.password)
     .then(res => {
       if(res) return(this);
     });

};

userSchema.methods.generateToken = function() {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET || 'aKJfjk4927lkjfdpp9');
};

userSchema.methods.attachAvatar = function(files) {
  let user = this,
    avatar = files[0],
    key = `${avatar.filename}-${avatar.originalname}`;

  return aws.uploadFile(avatar.path, key)
  .then(path => {
    user.avatar = path;
    return user.save();
  }).catch(console.error);
};

module.exports = mongoose.model('User', userSchema);