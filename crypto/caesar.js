module.exports = {
//These are your public methods,

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      shiftAmount - Number representing the amount the original text was shifted

    Returns:
      Needs to return the location on the server of the encrypted file
    */
    encryptCaesar: function(fileLoc, shiftAmount){
		var outputFileLoc = fileLoc + '.enc';
		var fs = require('fs');	  

		var plainText = fs.readFileSync(fileLoc); // read plain text from input file
		var cipherText = '';

		// perform encryption one character at a time
		for (var i = 0, len = plainText.length; i < len; i++) {
			var nextChar = '';		
			var byteCode = plainText[i];//plainText.charCodeAt(i); // get byte code for this character 
				
			if(byteCode >= 65 && byteCode <= 90){ // character is an upper case letter
				encryptedCode = ((byteCode - 65 + shiftAmount) % 26) + 65;
				nextChar = String.fromCharCode(encryptedCode);
			}else if(byteCode >= 97 && byteCode <= 122){ // character is a lower case letter
				encryptedCode = ((byteCode - 97 + shiftAmount) % 26) + 97;
				nextChar = String.fromCharCode(encryptedCode);
			}else{ // character is not a letter
				nextChar = String.fromCharCode(plainText[i]);
			}

			cipherText += nextChar; // append the (possibly encrypted) char to the cipher text
		}

		// write cipher text to output file location
		fs.writeFile(outputFileLoc, cipherText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return outputFileLoc; // return location of encrypted file
    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      shiftAmount - Number representing the amount the original text was shifted

    Returns:
      fileLoc - Location on the server of the decrypted file.
    */
    decryptCaesar: function(fileLoc, shiftAmount){
		var outputFileLoc = fileLoc + '.dec';
		var fs = require('fs');	  

		var cipherText = fs.readFileSync(fileLoc); // read cipher text from input file
		var plainText = '';

		// perform encryption one character at a time
		for (var i = 0, len = cipherText.length; i < len; i++) {
			var nextChar = '';		
			var byteCode = cipherText[i]; // get byte code for this character 
				
			if(byteCode >= 65 && byteCode <= 90){ // character is an upper case letter
				encryptedCode = ((byteCode - 65 - shiftAmount) % 26) + 65;
				nextChar = String.fromCharCode(encryptedCode);
			}else if(byteCode >= 97 && byteCode <= 122){ // character is a lower case letter
				encryptedCode = ((byteCode - 97 - shiftAmount) % 26) + 97;
				nextChar = String.fromCharCode(encryptedCode);
			}else{ // character is not a letter
				nextChar = String.fromCharCode(cipherText[i]);
			}

			plainText += nextChar; // append the (possibly encrypted) char to the cipher text
		}

		// write cipher text to output file location
		fs.writeFile(outputFileLoc, plainText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return outputFileLoc; // return location of encrypted file
    }

};

// Keep your private functions down here, they are usable from module.exports
