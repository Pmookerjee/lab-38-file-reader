'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3();

const fs = require('fs-extra');

const uploadFile = module.exports =  (avatarPath, key) => {
  return s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(avatarPath),
  })
  .promise()
  .then(res => { // onSuccess
    return fs.remove(avatarPath)
    .then(() => res.Location);
  }).catch(error => { 
    return fs.remove(avatarPath) 
    .then(() => Promise.reject(error));
  });  
  
};

const deleteImage = module.exports = (key) => {
  return s3.deleteObject({
    Key: key,
    Bucket: process.env.Bucket,
  })
  .promise()
} 


