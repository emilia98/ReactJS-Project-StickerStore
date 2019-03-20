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
router.get('/active', stickerController.getActive);
router.post('/create', upload, stickerController.create);
router.get('/status/:id', stickerController.changeActiveStatus);

module.exports = router;
