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
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = caesar.encryptCaesar(fileLoc);
  res.sendFile(encryptedFilePath);
})

router.post('/upload/encrypt/onetimepad', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = pad.encryptPad(fileLoc);
  res.sendFile(encryptedFilePath);
})

router.post('/upload/encrypt/aes', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = aes.encryptAES(fileLoc);
  res.sendFile(encryptedFilePath);
})

router.post('/upload/decrypt/caesar', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = encryptCaesar(fileLoc);
  res.sendFile(encryptedFilePath);
})

router.post('/upload/decrypt/onetimepad', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = encryptCaesar(fileLoc);
  res.sendFile(encryptedFilePath);
})

router.post('/upload/decrypt/aes', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = encryptCaesar(fileLoc);
  res.sendFile(encryptedFilePath);
})

module.exports = router;
