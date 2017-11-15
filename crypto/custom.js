module.exports = {
//These are your public methods,

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      shiftAmount - Number representing the amount the original text was shifted

    Returns:
      Needs to return the location on the server of the encrypted file as well as
	  the key to be used for decryption
    */
    encryptCaesar: function(fileLoc){
		var outputFileLoc = fileLoc + '.enc';
		var fs = require('fs');	  

		var plainText = fs.readFileSync(fileLoc); // read plain text from input file
		var cipherText = '';
		
		var key = generateRandomKey(); // generate a random 64-byte key

		// perform encryption one character at a time
		for (var i = 0, len = plainText.length; i < len; i++) {
			var nextChar = '';		
			var byteCode = plainText[i]; // get byte code for this character 
			
			var currentKeyCode = key[i % key.length]; // get current index of key to look at
			
			switch(currentKeyCode){ // encrypt next byte based on current key code
				case '0':
					nextChar = encrypt0(byteCode);
					break;
				case '1':
					nextChar = encrypt1(byteCode);
					break;
				case '2':
					nextChar = encrypt2(byteCode);
					break;
				case '3':
					nextChar = encrypt3(byteCode);
					break;
				case '4':
					nextChar = encrypt4(byteCode);
					break;
				case '5':
					nextChar = encrypt5(byteCode);
					break;
				case '6':
					nextChar = encrypt6(byteCode);
					break;
				case '7':
					nextChar = encrypt7(byteCode);
					break;
				case '8':
					nextChar = encrypt8(byteCode);
					break;
				case '9':
					nextChar = encrypt9(byteCode);
					break;
				case 'A':
					nextChar = encryptA(byteCode);
					break;
				case 'B':
					nextChar = encryptB(byteCode);
					break;
				case 'C':
					nextChar = encryptC(byteCode);
					break;
				case 'D':
					nextChar = encryptD(byteCode);
					break;
				case 'E':
					nextChar = encryptE(byteCode);
					break;
				case 'F':
					nextChar = encryptF(byteCode);
					break;		
			}

			cipherText += nextChar; // append the encrypted char to the cipher text
		}

		// write cipher text to output file location
		fs.writeFile(outputFileLoc, cipherText,  function(err) {
			if (err) {
			  return console.error(err);
			}
		});

		return [outputFileLoc, key]; // return location of encrypted file
    },

    /*
    Params:
      fileLoc - Location on the server filesystem of the uploaded fileLoc
      key - Key to perform decryption

    Returns:
      fileLoc - Location on the server of the decrypted file.
    */
    decryptCaesar: function(fileLoc, key){
		var outputFileLoc = fileLoc + '.dec';
		var fs = require('fs');	  

		var cipherText = fs.readFileSync(fileLoc); // read cipher text from input file
		var plainText = '';

		// perform encryption one character at a time
		for (var i = 0, len = cipherText.length; i < len; i++) {
			var nextChar = '';		
			var byteCode = cipherText[i]; // get byte code for this character 
			
			var currentKeyCode = key[i % key.length]; // get current index of key to look at
			
			switch(currentKeyCode){ // encrypt next byte based on current key code
				case '0':
					nextChar = decrypt0(byteCode);
					break;
				case '1':
					nextChar = decrypt1(byteCode);
					break;
				case '2':
					nextChar = decrypt2(byteCode);
					break;
				case '3':
					nextChar = decrypt3(byteCode);
					break;
				case '4':
					nextChar = decrypt4(byteCode);
					break;
				case '5':
					nextChar = decrypt5(byteCode);
					break;
				case '6':
					nextChar = decrypt6(byteCode);
					break;
				case '7':
					nextChar = decrypt7(byteCode);
					break;
				case '8':
					nextChar = decrypt8(byteCode);
					break;
				case '9':
					nextChar = decrypt9(byteCode);
					break;
				case 'A':
					nextChar = decryptA(byteCode);
					break;
				case 'B':
					nextChar = decryptB(byteCode);
					break;
				case 'C':
					nextChar = decryptC(byteCode);
					break;
				case 'D':
					nextChar = decryptD(byteCode);
					break;
				case 'E':
					nextChar = decryptE(byteCode);
					break;
				case 'F':
					nextChar = decryptF(byteCode);
					break;		
			}

			plainText += nextChar; // append the decrypted char to the cipher text
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

/*
Generates a random 64-bit key
*/
var generateRandomKey = function(){
  var possibleChars = '0123456789ABCDEF';
  var key = '';
  
  for(var i=0; i<64; i++)
	key += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	  
  return key;
};

/*
Encryption for key byte 0.
*/
var encrypt0 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 0.
*/
var decrypt0 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 1.
*/
var encrypt1 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 1.
*/
var decrypt1 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 2.
*/
var encrypt2 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 2.
*/
var decrypt2 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 3.
*/
var encrypt3 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 3.
*/
var decrypt3 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 4.
*/
var encrypt4 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 4.
*/
var decrypt4 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 5.
*/
var encrypt5 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 5.
*/
var decrypt5 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 6.
*/
var encrypt6 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 6.
*/
var decrypt6 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 7.
*/
var encrypt7 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 7.
*/
var decrypt7 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 8.
*/
var encrypt8 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 8.
*/
var decrypt8 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte 9.
*/
var encrypt9 = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte 9.
*/
var decrypt9 = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte A.
*/
var encryptA = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte A.
*/
var decryptA = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte B.
*/
var encryptB = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte B.
*/
var decryptB = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte C.
*/
var encryptC = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte C.
*/
var decryptC = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte D.
*/
var encryptD = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte D.
*/
var decryptD = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte E.
*/
var encryptE = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte E.
*/
var decryptE = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};

/*
Encryption for key byte F.
*/
var encryptF = function(originalByte){
  encryptedByte = originalByte; //perform encryption
  return encryptedByte;
};

/*
Decryption for key byte F.
*/
var decryptF = function(encryptedByte){
  decryptedByte = encryptedByte; //perform decryption
  return decryptedByte;
};