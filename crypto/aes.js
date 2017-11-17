var aesjs = require('aes-js');

module.exports = {

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc

    Returns:
      Needs to return a the location of the encrypted file and a string with
	  the key for decryption
    */
    encryptAES : function(fileLoc){
	  var outputFileLoc = fileLoc + '.enc';
	  var fs = require('fs');

	  var plainText = fs.readFileSync(fileLoc); // read plain text from input file
	  var cipherText = '';

    for (var a=[],i=0;i<16;++i) a[i]=i;

      function shuffle(array) {
        var tmp, current, top = array.length;
        if(top) while(--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
        return array;
      }

      a = shuffle(a);
      var index = a.indexOf(0);

      if (index !== -1) {
          a[index] = 16;
      }

      var key = a;
      var textBytes = aesjs.utils.utf8.toBytes(plainText);
      var aesCtr = new aesjs.ModeOfOperation.ctr(key);
      var encryptedBytes = aesCtr.encrypt(textBytes);
      cipherText = aesjs.utils.hex.fromBytes(encryptedBytes);


	  // write cipher text to output file location
	  fs.writeFileSync(outputFileLoc, cipherText,  function(err) {
		if (err) {
		  return console.error(err);
		}
	  });

      return [outputFileLoc, key.toString()]; // return location of encrypted folder
    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      pad - String representing the pad needed to decrypt the file

    Returns:
      Needs to return the location on the server of the decrypted file

    */
    decryptAES: function(fileLoc, key){
		var fs = require('fs');
		var outputFileLoc = fileLoc + '.dec';

		var cipherText = fs.readFileSync(fileLoc, 'utf8'); // read cipher text from input file
		var plainText = '';
    var keyArray = key.split(',').map(Number);
    var aesCtr = new aesjs.ModeOfOperation.ctr(keyArray);
    var encryptedBytes = aesjs.utils.hex.toBytes(cipherText);
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    plainText = aesjs.utils.utf8.fromBytes(decryptedBytes);


		// write cipher text to output file location
		fs.writeFileSync(outputFileLoc, plainText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return outputFileLoc; // return location of encrypted file
    }
};
