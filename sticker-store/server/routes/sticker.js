const router = require('express').Router();
const stickerController = require('../controllers/sticker');

const multer = require('multer');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('here');
        cb(null, './uploads/');
      },
      filename: function (req, file, cb) {
          console.log(file);
          /*
        crypto.pseudoRandomBytes(16, function (err, raw) {
          if (err) {
            throw new Error('Error!');
          }
          cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
        */
      }
});

let upload = multer({storage: storage});

router.post('/create', upload.fields([{ name: 'images', maxCount: 8 }]), stickerController.create);

module.exports=  router;
