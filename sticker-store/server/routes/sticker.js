const router = require('express').Router();
const crypto = require('crypto');
const mime = require('mime');
const stickerController = require('../controllers/sticker');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
     // console.log(file);
      //  console.log('here');
        cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
          console.log(file);
          
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) {
            throw new Error('Error!');
          }
          cb(null, Date.now() + '_' +  file.originalname);
        });
        
      }
});

let upload = multer({storage: storage}).any();

router.get('/all', stickerController.getAll);
router.post('/create', upload, stickerController.create);

module.exports=  router;
