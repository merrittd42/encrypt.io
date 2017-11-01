var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'encrypt.io' });
});

router.post('/profile', upload.single('encryptFile'), async (req, res) => {

});

module.exports = router;
