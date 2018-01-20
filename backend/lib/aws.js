'use strict';

const aws = require('aws-sdk');
const s3 = new aws.S3();

const fs = require('fs-extra');

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

const uploadFile = (avatarPath, key) => {

  console.log('avatarPath and key is ', avatarPath, ' ', key)
  return s3.upload({
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(avatarPath),
  })
  .promise()
  .then(res => { 
    
    console.log('res in aws is ', res);
    return fs.remove(avatarPath)
    .then(() => res.Location);
  }).catch(error => { 
    return fs.remove(avatarPath) 
    .then(() => Promise.reject(error));
  });  
  
};

const deleteImage = (key) => {
  return s3.deleteObject({
    Key: key,
    Bucket: process.env.Bucket,
  })
  .promise()
} 

module.exports = {uploadFile, deleteImage};


