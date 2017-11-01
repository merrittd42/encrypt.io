var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var app = express()
/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'encrypt.io' });
});

app.post('/upload/encrypt/caesar', upload.single('encryptFile'), function (req, res, next){
  var file = req.file;
  console.log(req.file)
})

router.post('/upload/encrypt/pad', upload.single('encryptFile'), async (req, res) => {

})

router.post('/upload/encrypt/AES', upload.single('encryptFile'), async (req, res) => {

})

router.post('/upload/decrypt/caesar', upload.single('decryptFile'), async (req, res) => {

})

router.post('/upload/decrypt/pad', upload.single('decryptFile'), async (req, res) => {

})

router.post('/upload/decrypt/AES', upload.single('decryptFile'), async (req, res) => {

})

module.exports = router;
