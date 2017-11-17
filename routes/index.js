var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })
var caesar = require('../crypto/caesar.js')
var pad = require('../crypto/onetimepad.js')
var custom = require('../crypto/custom.js')
var aes = require('../crypto/aes.js')
var fs = require('fs');

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
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(encryptedFilePath);
});
})

router.post('/upload/encrypt/onetimepad', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;

  var fs = require('fs');
  var archiver = require('archiver');
  var path = require('path');
  var zipLoc = path.dirname(fileLoc) + '/padEncryption.zip';

  returnArray = pad.encryptPad(fileLoc);
  var encFileLoc = returnArray[0];
  var padKey = returnArray[1];

  // create a file to stream archive data to.
  var output = fs.createWriteStream(zipLoc);
  output.on('close', function () {
    res.download(zipLoc);
  });

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.append(fs.createReadStream(encFileLoc), { name: 'encryptedFile.txt' });

  // append a file from string
  archive.append(padKey, { name: 'key.txt' });

  // pipe archive data to the file
  archive.pipe(output);

  archive.finalize();
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(encryptedFilePath);
  fs.unlinkSync(zipLoc);
});

})

router.post('/upload/encrypt/custom', upload.single('encryptFile'), function (req, res){
  var returnArray = [];
  var file = req.file;
  var fileLoc = file.path;

  var fs = require('fs');
  var archiver = require('archiver');
  var path = require('path');
  var zipLoc = path.dirname(fileLoc) + '/customEncryption.zip';

  returnArray = custom.encryptCustom(fileLoc);
  var encFileLoc = returnArray[0];
  var encKey = returnArray[1];

  // create a file to stream archive data to.
  var output = fs.createWriteStream(zipLoc);
  output.on('close', function () {
    res.download(zipLoc);
  });
  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.append(fs.createReadStream(encFileLoc), { name: 'encryptedFile.txt' });

  // append a file from string
  archive.append(encKey, { name: 'key.txt' });

  // pipe archive data to the file
  archive.pipe(output);

  archive.finalize();
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(encryptedFilePath);
  fs.unlinkSync(zipLoc);
});
})

router.post('/upload/encrypt/AES', upload.single('encryptFile'), function (req, res){
  var file = req.file;
  var fileLoc = file.path;

  var fs = require('fs');
  var archiver = require('archiver');
  var path = require('path');
  var zipLoc = path.dirname(fileLoc) + '/aesEncryption.zip';

  returnArray = aes.encryptAES(fileLoc);
  var encFileLoc = returnArray[0];
  var aesKey = returnArray[1];

  // create a file to stream archive data to.
  var output = fs.createWriteStream(zipLoc);
  output.on('close', function () {
    res.download(zipLoc);
  });

  var archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.append(fs.createReadStream(encFileLoc), { name: 'encryptedFile.txt' });

  // append a file from string
  archive.append(aesKey, { name: 'key.txt' });

  // pipe archive data to the file
  archive.pipe(output);

  archive.finalize();
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(encryptedFilePath);
  fs.unlinkSync(zipLoc);
});
})

router.post('/upload/decrypt/caesar', upload.single('encryptFile'), function (req, res){
  var shiftAmount = parseInt(req.body.shift);
  var file = req.file;
  var fileLoc = file.path;
  var decryptedFilePath = caesar.decryptCaesar(fileLoc, shiftAmount);
  res.download(decryptedFilePath, "yourDecryptedFile.txt");
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(decryptedFilePath);
});
})

router.post('/upload/decrypt/onetimepad', upload.single('encryptFile'), function (req, res){
  var key = req.body.key;
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = pad.decryptPad(fileLoc, key);
  res.download(encryptedFilePath, "yourDecryptedFile.txt");
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(decryptedFilePath);
});
})

router.post('/upload/decrypt/custom', upload.single('encryptFile'), function (req, res){
  var key = req.body.key;
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = custom.decryptCustom(fileLoc, key);
  res.download(encryptedFilePath, "yourDecryptedFile.txt");
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(decryptedFilePath);
});
})

router.post('/upload/decrypt/AES', upload.single('encryptFile'), function (req, res){
  var key = req.body.key;
  var file = req.file;
  var fileLoc = file.path;
  var encryptedFilePath = aes.decryptAES(fileLoc, key);
  res.download(encryptedFilePath, "yourDecryptedFile.txt");
  res.on('end', function(){
  fs.unlinkSync(fileLoc);
  fs.unlinkSync(decryptedFilePath);
});
});



module.exports = router;
