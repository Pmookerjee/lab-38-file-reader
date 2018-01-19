const multer = require('multer');
const bodyParser = require('body-parser');

const fileHandler = multer({dest: `${__dirname}/../../profile-photos`});

module.exports = (req, res, next) => {
    
  let header = req.headers['content-type'];
  
  if(header.indexOf('application/json') !== -1 ) { 
    return bodyParser.json()(req, res, next);
  }
  
  if (header.indexOf('multipart/form-data') !== -1 ) { 
    return fileHandler.any()(req, res ,next);
  }   
};