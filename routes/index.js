var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })
var caesar = require('../crypto/caesar.js')
var pad = require('../crypto/onetimepad.js')
var aes = require('../crypto/aes.js')

var app = express()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'encrypt.io' });
});

router.post('/upload/encrypt/caesar', upload.single('encryptFile'), function (req, res){
  var shiftAmount = parseInt(req.body.shift);
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = caesar.encryptCaesar(fileLoc, shiftAmount);
  res.download(encryptedFilePath, "yourEncryptedFile.txt");
})

router.post('/upload/encrypt/onetimepad', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var zipLoc = pad.encryptPad(fileLoc);
  res.download(zipLoc);
})

router.post('/upload/encrypt/weirdsub', upload.single('encryptFile'), function (req, res){
  var returnArray = [];
  var file = req.file;
  var fileLoc = file.path;
  returnArray = aes.encryptAES(fileLoc);
  var encryptedFilePath = returnArray[0];
  var key = returnArray[1];
  res.download(encryptedFilePath);
  res.json({
      "key" : key
  });
})

router.post('/upload/decrypt/caesar', upload.single('encryptFile'), function (req, res){
  var shiftAmount = req.body.key;
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = caesar.decryptCaesar(fileLoc, key);
  res.download(encryptedFilePath);
})

router.post('/upload/decrypt/onetimepad', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = pad.decryptPad(fileLoc, key);
  res.download(encryptedFilePath);
})

router.post('/upload/decrypt/weirdsub', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = aes.decryptAES(fileLoc, key);
  res.download(encryptedFilePath);
})

module.exports = router;
