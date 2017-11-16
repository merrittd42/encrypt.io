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
    encryptCustom: function(fileLoc){
		var outputFileLoc = fileLoc + '.enc';
		var fs = require('fs');	  

		var plainText = fs.readFileSync(fileLoc); // read plain text from input file
		var cipherText = '';
		
		var key = generateRandomKey(); // generate a random 64-byte key
		
		// perform encryption one character at a time
		for (var i = 0, len = plainText.length; i < len; i++) {
			var nextCharByteCode = '';
			var byteCode = plainText[i]; // get byte code for this character 
			
			var currentKeyCode = key[i % key.length]; // get current index of key to look at
			var prevKeyCode = key[(i-1) % key.length]; //get previous index of key for specific encryptions

			switch(currentKeyCode){ // encrypt next byte based on current key code
				case '0':
					nextCharByteCode = encrypt0(byteCode);
					break;
				case '1':
					nextCharByteCode = encrypt1(byteCode);
					break;
				case '2':
					nextCharByteCode = encrypt2(byteCode);
					break;
				case '3':
					nextCharByteCode = encrypt3(byteCode);
					break;
				case '4':
					nextCharByteCode = encrypt4(byteCode);
					break;
				case '5':
					nextCharByteCode = encrypt5(byteCode);
					break;
				case '6':
					nextCharByteCode = encrypt6(byteCode);
					break;
				case '7':
					nextCharByteCode = encrypt7(byteCode);
					break;
				case '8':
					nextCharByteCode = encrypt8(byteCode);
					break;
				case '9':
					nextCharByteCode = encrypt9(byteCode);
					break;
				case 'A':
					nextCharByteCode = encryptA(byteCode);
					break;
				case 'B':
					nextCharByteCode = encryptB(byteCode);
					break;
				case 'C':
					nextCharByteCode = encryptC(byteCode);
					break;
				case 'D':
					nextCharByteCode = encryptD(byteCode);
					break;
				case 'E':
					nextCharByteCode = encryptE(byteCode);
					break;
				case 'F':
					nextCharByteCode = encryptF(byteCode);
					break;		
			}

			cipherText += String.fromCharCode(nextCharByteCode); // append the encrypted char to the cipher text
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
    decryptCustom: function(fileLoc, key){
		var outputFileLoc = fileLoc + '.dec';
		var fs = require('fs');	  

		var cipherText = fs.readFileSync(fileLoc); // read cipher text from input file
		var plainText = '';

		// perform encryption one character at a time
		for (var i = 0, len = cipherText.length; i < len; i++) {
			var nextCharByteCode = '';		
			var byteCode = cipherText[i]; // get byte code for this character 
			
			var currentKeyCode = key[i % key.length]; // get current index of key to look at
			var prevKeyCode = key[(i-1) % key.length]; //get previous index of key for specific encryptions

			switch(currentKeyCode){ // encrypt next byte based on current key code
				case '0':
					nextCharByteCode = decrypt0(byteCode);
					break;
				case '1':
					nextCharByteCode = decrypt1(byteCode);
					break;
				case '2':
					nextCharByteCode = decrypt2(byteCode);
					break;
				case '3':
					nextCharByteCode = decrypt3(byteCode);
					break;
				case '4':
					nextCharByteCode = decrypt4(byteCode);
					break;
				case '5':
					nextCharByteCode = decrypt5(byteCode);
					break;
				case '6':
					nextCharByteCode = decrypt6(byteCode);
					break;
				case '7':
					nextCharByteCode = decrypt7(byteCode);
					break;
				case '8':
					nextCharByteCode = decrypt8(byteCode);
					break;
				case '9':
					nextCharByteCode = decrypt9(byteCode);
					break;
				case 'A':
					nextCharByteCode = decryptA(byteCode);
					break;
				case 'B':
					nextCharByteCode = decryptB(byteCode);
					break;
				case 'C':
					nextCharByteCode = decryptC(byteCode);
					break;
				case 'D':
					nextCharByteCode = decryptD(byteCode);
					break;
				case 'E':
					nextCharByteCode = decryptE(byteCode);
					break;
				case 'F':
					nextCharByteCode = decryptF(byteCode);
					break;		
			}

			plainText += String.fromCharCode(nextCharByteCode); // append the decrypted char to the cipher text
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