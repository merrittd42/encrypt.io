module.exports = {

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc

    Returns:
      Needs to return a the location of the encrypted file and a string with
	  the key for decryption
    */
    encryptPad : function(fileLoc){
	  var outputFileLoc = fileLoc + '.enc';
	  var fs = require('fs');

	  var plainText = fs.readFileSync(fileLoc); // read plain text from input file
	  var cipherText = '';
	  var padKey = '';

	  // perform encryption one character at a time
	  for (var i = 0, len = plainText.length; i < len; i++) {
		var byteCode = plainText[i]; // get byte code for this character
		var shiftAmount = Math.floor(Math.random() * 95); // gets a number between 0 and 94
		var encryptedCode;
		
		if(byteCode < 32 || byteCode > 126){
			encryptedCode = byteCode;
		}else{
			encryptedCode = ((byteCode - 32 + shiftAmount) % 95) + 32;
		}
		
		padKey += String.fromCharCode(shiftAmount + 32); // slowly create the pad key
		cipherText += String.fromCharCode(encryptedCode); // append the (possibly encrypted) char to the cipher text
	  }

	  // write cipher text to output file location
	  fs.writeFileSync(outputFileLoc, cipherText,  function(err) {
		if (err) {
		  return console.error(err);
		}
	  });

      return [outputFileLoc, padKey]; // return location of encrypted folder
    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      pad - String representing the pad needed to decrypt the file

    Returns:
      Needs to return the location on the server of the decrypted file

    */
    decryptPad: function(fileLoc, pad){
		var fs = require('fs');	
		var outputFileLoc = fileLoc + '.dec';

		var cipherText = fs.readFileSync(fileLoc); // read cipher text from input file
		var plainText = '';

		// perform encryption one character at a time
		for (var i = 0, len = cipherText.length; i < len; i++) {
			var byteCode = cipherText[i]; // get byte code for this character
			
			if(byteCode < 32 || byteCode > 126){
				plainText += String.fromCharCode(byteCode); // append the (possibly encrypted) char to the cipher text
			}else{
				var shiftAmount = pad.charCodeAt(i) - 32;
				var decryptedCode = ((byteCode - 32 - shiftAmount + 95) % 95) + 32;
				plainText += String.fromCharCode(decryptedCode); // append the (possibly encrypted) char to the cipher text
			}
		}

		// write cipher text to output file location
		fs.writeFileSync(outputFileLoc, plainText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return outputFileLoc; // return location of encrypted file
    }
};
